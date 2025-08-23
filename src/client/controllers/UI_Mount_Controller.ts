/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, OnStart } from "@flamework/core";
import React from "@rbxts/react";
import ReactRoblox, { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { BadgeAwardApp } from "client/components/badgeAward";
import { teamTSXApp } from "client/components/TeamUI";

@Controller()
export class UI implements OnStart {
	private readonly root: ReactRoblox.Root;
	private readonly root2: ReactRoblox.Root;
	private readonly playerGUI: PlayerGui;

	constructor() {
		this.playerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
		const screenGui = new Instance("ScreenGui");
		screenGui.Name = "BadgeAwardUI";
		screenGui.Parent = this.playerGUI;
		const root2 = new Instance("Folder");
		root2.Name = "TeamUI";
		root2.Parent = this.playerGUI;

		this.root = ReactRoblox.createRoot(screenGui);
		this.root2 = ReactRoblox.createRoot(root2);
	}

	onStart(): void {
		this.root.render(React.createElement(BadgeAwardApp, {}));
		this.root2.render(React.createElement(teamTSXApp, {}));
	}
}
