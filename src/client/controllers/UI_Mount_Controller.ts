/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, OnStart } from "@flamework/core";
import React from "@rbxts/react";
import { StrictMode as ReactStrictMode } from "@rbxts/react";
import ReactRoblox, { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { BadgeAwardApp } from "client/components/badgeAward";

@Controller()
export class UI implements OnStart {
	private readonly root: ReactRoblox.Root;
	private readonly playerGUI: PlayerGui;

	constructor() {
		this.playerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
		// Create a ScreenGui instance to hold our React components
		const screenGui = new Instance("ScreenGui");
		screenGui.Name = "BadgeAwardUI";
		screenGui.Parent = this.playerGUI;

		this.root = ReactRoblox.createRoot(screenGui);
	}

	onStart(): void {
		this.root.render(React.createElement(ReactStrictMode, {}, React.createElement(BadgeAwardApp, {})));
	}
}
