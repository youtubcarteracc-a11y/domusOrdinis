import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useState } from "@rbxts/react";
import Ripple from "@rbxts/ripple";
import { BadgeService } from "@rbxts/services";
import { Events } from "client/network";

export function BadgeAwardApp() {
	const [badgeText, setBadgeText] = useState("");
	const [badgeDescription, setBadgeDescription] = useState("");
	const [transparency, setTransparency] = useMotion(1);

	Events.requestBadgeAnimation.connect((badgeID: number) => {
		const badgeInfo = BadgeService.GetBadgeInfoAsync(badgeID);
		setTransparency.spring(0, Ripple.config.spring.slow);
		setBadgeText(badgeInfo.Name);
		setBadgeDescription(badgeInfo.Description);
		task.delay(3, () => {
			setTransparency.spring(1, Ripple.config.spring.slow);
		});
	});

	return (
		<screengui
			ResetOnSpawn={true}
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<textlabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Font={Enum.Font.Unknown}
				Position={new UDim2(0.5, 0, 0.3, 0)}
				Size={new UDim2(0.4, 0, 0.15, 0)}
				Text={badgeDescription}
				TextTransparency={transparency}
				FontFace={Font.fromId(12187376545)}
				TextColor3={Color3.fromRGB(0, 0, 0)}
				TextScaled={true}
				TextSize={14}
				TextWrapped={true}
			/>
			<canvasgroup
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(216, 218, 177)}
				BorderSizePixel={0}
				GroupTransparency={transparency}
				Position={new UDim2(0.5, 0, 0.15, 0)}
				Size={new UDim2(0.4, 0, 0.12, 0)}
			>
				<uistroke
					ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
					Color={Color3.fromRGB(131, 127, 76)}
					Thickness={5.2}
					Transparency={transparency}
				/>
				<textlabel
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundTransparency={1}
					Font={Enum.Font.Unknown}
					Position={new UDim2(0.5, 0, 0.5, 0)}
					Size={new UDim2(1, 0, 1, 0)}
					Text={badgeText}
					FontFace={Font.fromId(12187376545)}
					TextColor3={Color3.fromRGB(0, 0, 0)}
					TextScaled={true}
					TextSize={14}
					TextWrapped={true}
				/>
			</canvasgroup>
		</screengui>
	);
}
