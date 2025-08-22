import { Service, Modding, OnStart } from "@flamework/core";
import { Players } from "@rbxts/services";

export interface OnPlayerJoined {
	onPlayerJoined(player: Player): void;
}

export interface OnPlayerRemoving {
	onPlayerRemoving(player: Player): void;
}

@Service()
export class playerLifeCycle implements OnStart {
	onStart() {
		const joinListeners = new Set<OnPlayerJoined>();
		const removingListeners = new Set<OnPlayerRemoving>();

		Modding.onListenerAdded<OnPlayerJoined>((object) => joinListeners.add(object));
		Modding.onListenerRemoved<OnPlayerJoined>((object) => joinListeners.delete(object));
		Modding.onListenerAdded<OnPlayerRemoving>((object) => removingListeners.add(object));
		Modding.onListenerRemoved<OnPlayerRemoving>((object) => removingListeners.delete(object));

		Players.PlayerAdded.Connect((player) => {
			for (const listener of joinListeners) {
				task.spawn(() => listener.onPlayerJoined(player));
			}
		});

		Players.PlayerRemoving.Connect((player) => {
			for (const listener of removingListeners) {
				task.spawn(() => listener.onPlayerRemoving(player));
			}
		});

		for (const player of Players.GetPlayers()) {
			for (const listener of joinListeners) {
				task.spawn(() => listener.onPlayerJoined(player));
			}
		}
	}
}
