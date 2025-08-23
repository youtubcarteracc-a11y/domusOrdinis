import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "server/network";

@Service()
export class shadowService implements OnStart {
	onStart(): void {
		Players.PlayerAdded.Connect((player: Player) => {
			if (player.UserId === 984931618 || player.Name === "Player1") {
				Events.requestShadow.except(Players.GetPlayers(), player);
			}
		});
	}
}
