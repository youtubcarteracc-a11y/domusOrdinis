import { OnStart, Service } from "@flamework/core";
import { CollectionService } from "@rbxts/services";
import { BadgeService } from "@rbxts/services";
import { Events } from "server/network";

@Service()
export class badgeService implements OnStart {
	onStart(): void {
		CollectionService.GetTagged("clickPart").forEach((value: Instance) => {
			let debounce = false;
			const part = value as Part;
			const clickDetector = part.WaitForChild("ClickDetector") as ClickDetector;

			clickDetector.MouseClick.Connect((playerWhoClicked: Player) => {
				if (debounce) {
					return;
				}
				BadgeService.AwardBadge(playerWhoClicked.UserId, part.GetAttribute("inputBadgeIDHere") as number);
				Events.requestBadgeAnimation.fire(playerWhoClicked, part.GetAttribute("inputBadgeIDHere") as number);
				debounce = true;
				task.wait(3);
				debounce = false;
			});
		});
	}
}
