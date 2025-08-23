import { Controller } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Events } from "client/network";

@Controller()
export class shadowController {
	constructor() {
		Events.requestShadow.connect((player: Player) => {
			Players.GetPlayers().forEach((plr: Player) => {
				if (plr.UserId === player.UserId) {
					plr.Parent = undefined;
					plr.Parent = Players.LocalPlayer.Character;
				}
			});
		});
	}
}
