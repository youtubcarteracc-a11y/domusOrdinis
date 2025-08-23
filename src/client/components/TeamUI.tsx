import { useMotion } from "@rbxts/pretty-react-hooks";
import React, { useState, useEffect } from "@rbxts/react";
import Ripple from "@rbxts/ripple";
import { UserInputService } from "@rbxts/services";
import { Events } from "client/network";
const teamConfig = {
	HP: "Holy Protectorate",
	BP: "Blitz Personnel",
	BA: "Blitz Authority",
	IM: "Imperator",
	VI: "Visitor",
};
export function teamTSXApp() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [isOpen, setIsOpen] = useState(false);
	const [debounce, setDebounce] = useState(false);
	const [position, setPosition] = useMotion<UDim2>(new UDim2(-0.1, 0, 0.5, 0));
	const [transparency, setTransparency] = useMotion<number>(1);

	function handleOpen() {
		setIsOpen((currentIsOpen) => {
			if (currentIsOpen === true) {
				setPosition.spring(new UDim2(-0.1, 0, 0.5, 0), Ripple.config.spring.molasses);
				setTransparency.spring(1, Ripple.config.spring.molasses);
				return false;
			} else if (currentIsOpen === false) {
				setPosition.spring(new UDim2(0.1, 0, 0.5, 0), Ripple.config.spring.gentle);
				setTransparency.spring(0, Ripple.config.spring.gentle);
				return true;
			}
			return currentIsOpen;
		});
	}

	useEffect(() => {
		const connection = UserInputService.InputBegan.Connect((input: InputObject) => {
			if (input.KeyCode === Enum.KeyCode.M) {
				if (debounce) return;
				handleOpen();
				setDebounce(true);
				task.delay(0.5, () => {
					setDebounce(false);
				});
			}
		});

		// Cleanup function to disconnect the event listener when component unmounts
		return () => {
			connection.Disconnect();
		};
	}, []); // Empty dependency array means this effect runs once on mount

	return (
		<screengui
			key="TeamUI"
			IgnoreGuiInset={true}
			ScreenInsets={Enum.ScreenInsets.DeviceSafeInsets}
			ZIndexBehavior={Enum.ZIndexBehavior.Sibling}
		>
			<canvasgroup
				Active={true}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(216, 218, 177)}
				BorderSizePixel={0}
				Position={position}
				GroupTransparency={transparency}
				Size={new UDim2(0, 236, 0, 350)}
			>
				<uistroke Color={Color3.fromRGB(131, 127, 76)} Thickness={5.2} Transparency={transparency} />
				<frame
					key="Holy Protectorate"
					Active={true}
					Event={{
						InputBegan: (frame: Frame, input: InputObject) => {
							if (input.UserInputType === Enum.UserInputType.MouseButton1) {
								Events.sendTeamRequest.fire(teamConfig.HP);
							}
						},
					}}
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundColor3={Color3.fromRGB(74, 74, 74)}
					BorderSizePixel={0}
					Position={new UDim2(0.164, 0, 0.062, 0)}
					Size={new UDim2(0.83, 0, 0.14, 0)}
				>
					<uistroke Color={Color3.fromRGB(131, 127, 76)} Thickness={5.2} />
					<imagelabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Image="rbxassetid://110224261383532"
						ImageTransparency={0.2}
						Position={new UDim2(0.511, 0, 0.499, 0)}
						ScaleType={Enum.ScaleType.Crop}
						Size={new UDim2(0, 200, 0, 48)}
					/>
					<textlabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Font={Enum.Font.Unknown}
						Position={new UDim2(0.516, 0, 0.49, 0)}
						Size={new UDim2(0, 200, 0, 50)}
						Text="Holy Protectorate"
						TextColor3={Color3.fromRGB(97, 181, 255)}
						TextScaled={true}
						TextSize={25}
						TextStrokeTransparency={0}
						TextWrapped={true}
					/>
				</frame>
				<frame
					key="Blitz Personnel"
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundColor3={Color3.fromRGB(74, 74, 74)}
					BorderSizePixel={0}
					Event={{
						InputBegan: (frame: Frame, input: InputObject) => {
							if (input.UserInputType === Enum.UserInputType.MouseButton1) {
								Events.sendTeamRequest.fire(teamConfig.BP);
							}
						},
					}}
					Position={new UDim2(0.164, 0, 0.246, 0)}
					Size={new UDim2(0.83, 0, 0.14, 0)}
				>
					<uistroke Color={Color3.fromRGB(131, 127, 76)} Thickness={5.2} />
					<imagelabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Image="rbxassetid://74624851095812"
						ImageTransparency={0.2}
						Position={new UDim2(0.511, 0, 0.5, 0)}
						ScaleType={Enum.ScaleType.Crop}
						Size={new UDim2(0, 196, 0, 47)}
					/>
					<textlabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Font={Enum.Font.Unknown}
						Position={new UDim2(0.516, 0, 0.49, 0)}
						Size={new UDim2(0, 200, 0, 50)}
						Text="Blitz Personnel"
						TextColor3={Color3.fromRGB(255, 48, 48)}
						TextScaled={true}
						TextSize={14}
						TextStrokeTransparency={0}
						TextWrapped={true}
					/>
				</frame>
				<frame
					key="Blitz Authority"
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundColor3={Color3.fromRGB(74, 74, 74)}
					BorderSizePixel={0}
					Position={new UDim2(0.164, 0, 0.431, 0)}
					Size={new UDim2(0.83, 0, 0.14, 0)}
					Event={{
						InputBegan: (frame: Frame, input: InputObject) => {
							if (input.UserInputType === Enum.UserInputType.MouseButton1) {
								Events.sendTeamRequest.fire(teamConfig.BA);
							}
						},
					}}
				>
					<uistroke Color={Color3.fromRGB(131, 127, 76)} Thickness={5.2} />
					<imagelabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Image="rbxassetid://101577386819662"
						ImageTransparency={0.2}
						Position={new UDim2(0.511, 0, 0.514, 0)}
						ScaleType={Enum.ScaleType.Crop}
						Size={new UDim2(0, 196, 0, 47)}
					/>
					<textlabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Font={Enum.Font.Unknown}
						Position={new UDim2(0.516, 0, 0.49, 0)}
						Size={new UDim2(0, 200, 0, 50)}
						Text="Blitz Authority"
						TextColor3={Color3.fromRGB(255, 255, 255)}
						TextScaled={true}
						TextSize={14}
						TextStrokeTransparency={0}
						TextWrapped={true}
					/>
				</frame>
				<frame
					key="Imperator"
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundColor3={Color3.fromRGB(74, 74, 74)}
					BorderSizePixel={0}
					Position={new UDim2(0.164, 0, 0.615, 0)}
					Size={new UDim2(0.83, 0, 0.14, 0)}
					Event={{
						InputBegan: (frame: Frame, input: InputObject) => {
							if (input.UserInputType === Enum.UserInputType.MouseButton1) {
								Events.sendTeamRequest.fire(teamConfig.IM);
							}
						},
					}}
				>
					<uistroke Color={Color3.fromRGB(131, 127, 76)} Thickness={5.2} />
					<imagelabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Image="rbxassetid://100844598939084"
						ImageTransparency={0.2}
						Interactable={false}
						Position={new UDim2(0.511, 0, 0.529, 0)}
						ScaleType={Enum.ScaleType.Crop}
						Size={new UDim2(0, 196, 0, 47)}
					/>
					<textlabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Font={Enum.Font.Unknown}
						Position={new UDim2(0.516, 0, 0.49, 0)}
						Size={new UDim2(0, 200, 0, 50)}
						Text="Imperator"
						TextColor3={Color3.fromRGB(255, 252, 160)}
						TextScaled={true}
						TextSize={14}
						TextStrokeTransparency={0}
						TextWrapped={true}
					/>
				</frame>
				<uilistlayout
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0, 15)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<frame
					key="Visitor"
					Active={true}
					AnchorPoint={new Vector2(0.5, 0.5)}
					AutomaticSize={Enum.AutomaticSize.XY}
					BackgroundColor3={Color3.fromRGB(74, 74, 74)}
					BorderSizePixel={0}
					Position={new UDim2(0.164, 0, 0.8, 0)}
					Size={new UDim2(0.83, 0, 0.14, 0)}
					Event={{
						InputBegan: (frame: Frame, input: InputObject) => {
							if (input.UserInputType === Enum.UserInputType.MouseButton1) {
								Events.sendTeamRequest.fire(teamConfig.VI);
							}
						},
					}}
				>
					<uistroke Color={Color3.fromRGB(131, 127, 76)} Thickness={5.2} />
					<imagelabel
						Active={true}
						AnchorPoint={new Vector2(0.5, 0.5)}
						AutomaticSize={Enum.AutomaticSize.XY}
						BackgroundTransparency={1}
						Image="rbxassetid://80496548911665"
						ImageTransparency={0.2}
						Position={new UDim2(0.511, 0, 0.529, 0)}
						ScaleType={Enum.ScaleType.Crop}
						Size={new UDim2(0, 196, 0, 47)}
					>
						<textlabel
							Active={true}
							AnchorPoint={new Vector2(0.5, 0.5)}
							AutomaticSize={Enum.AutomaticSize.XY}
							BackgroundTransparency={1}
							Font={Enum.Font.Unknown}
							Position={new UDim2(0.516, 0, 0.49, 0)}
							Size={new UDim2(0, 200, 0, 50)}
							Text="Visitor"
							TextColor3={Color3.fromRGB(255, 255, 255)}
							TextScaled={true}
							TextSize={14}
							TextStrokeTransparency={0}
							TextWrapped={true}
						/>
					</imagelabel>
				</frame>
			</canvasgroup>
		</screengui>
	);
}
