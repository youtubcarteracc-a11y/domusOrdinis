import { OnStart, Service } from "@flamework/core";
import { Firebase } from "@rbxts/firebase";
import { Players } from "@rbxts/services";
import { Functions } from "server/network";
import { PlayerDataTemplate } from "shared/services/templates/playerDataTemplate";
import { playerDataMap } from "shared/services/sharedData/playerDataMap";
import { $env } from "rbxts-transform-env";

const firebaseConfig = {
	apiKey: $env.string("FIREBASE_API_KEY") as string,
	databaseURL: $env.string("FIREBASE_DATABASE_URL") as string,
};

let firebase: Firebase;

try {
	firebase = new Firebase(firebaseConfig.databaseURL, firebaseConfig.apiKey);
} catch (error) {
	warn(`Failed to initialize Firebase: ${script.Name}`, error);
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
			} catch (error) {
				warn(`Failed to save player data for ${player.Name}: ${script.Name}`, error);
			}
		});

		Players.PlayerRemoving.Connect((player: Player) => {
			playerDataMap.delete(player.Name);
		});

		Functions.requestAllPlayerData.setCallback(() => {
			return playerDataMap;
		});
	}

	public updatePlayerData(playerName: string, newData: PlayerDataTemplate): void {
		playerDataMap.set(playerName, newData);

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
