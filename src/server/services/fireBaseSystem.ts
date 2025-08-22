import { OnStart, Service } from "@flamework/core";
import { Firebase } from "@rbxts/firebase";
import { Players } from "@rbxts/services";
import { Functions } from "server/network";
import { PlayerDataTemplate } from "shared/services/templates/playerDataTemplate";
import { playerDataMap } from "shared/services/sharedData/playerDataMap";

const firebaseConfig = {
	databaseURL: "https://flamework-b1fc9-default-rtdb.firebaseio.com",
	apiKey: "WimuZqqV4IRd6htQQp6pzx5yIjvRljxg5kAcouzO",
};
// Initialize Firebase - Note: This may still not work with just an API key
// You might need to use Firebase Admin SDK or a service account key for server-side access
let firebase: Firebase;

try {
	firebase = new Firebase(firebaseConfig.databaseURL, firebaseConfig.apiKey);
} catch (error) {
	warn(`Failed to initialize Firebase: ${script.Name}`, error);
	// Create a fallback instance or handle the error appropriately
}

@Service()
export class fireBaseSystem implements OnStart {
	onStart(): void {
		if (!firebase) {
			warn(`Database not initialized. ${script.Name}`);
			return;
		}

		Players.PlayerAdded.Connect(async (player: Player) => {
			const existingData = await firebase.get(player.Name);
			if (existingData) {
				const playerData = existingData as PlayerDataTemplate;
				playerDataMap.set(player.Name, playerData);
				// Notify OnPlayerEvents that data is loaded
				// Notify the client about their data
				return;
			}

			const playerData: PlayerDataTemplate = {
				playerIdentificationEntity: {
					age: player.AccountAge,
					robloxId: player.UserId,
					money: 0,
					badges: { listofBadges: [] },
				},
			};

			try {
				playerDataMap.set(player.Name, playerData);
				firebase.set(player.Name, playerData);
				// Notify OnPlayerEvents that data is loaded
				// Notify the client about their new data
			} catch (error) {
				warn(`Failed to save player data for ${player.Name}: ${script.Name}`, error);
			}
		});

		// When a player leaves, remove their data from the map
		Players.PlayerRemoving.Connect((player: Player) => {
			playerDataMap.delete(player.Name);
			// Notify OnPlayerEvents that data is removed
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		Functions.requestAllPlayerData.setCallback((player?: Player) => {
			return playerDataMap;
		});
	}

	// Method to update player data and notify clients
	public updatePlayerData(playerName: string, newData: PlayerDataTemplate): void {
		playerDataMap.set(playerName, newData);
		// Notify OnPlayerEvents that data is updated

		const player = Players.FindFirstChild(playerName) as Player;
		if (player) {
			print(player.Name, newData.playerIdentificationEntity.age);
		}
		// Save to Firebase
		if (firebase) {
			firebase.set(playerName, newData);
		}
	}
}
