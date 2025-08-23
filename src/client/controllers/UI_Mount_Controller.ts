/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, OnStart } from "@flamework/core";
import React, { createElement, StrictMode, Fragment } from "@rbxts/react";
import ReactRoblox, { createPortal, createRoot } from "@rbxts/react-roblox";
import { Players } from "@rbxts/services";
import { BadgeAwardApp } from "client/components/badgeAward";
import { teamTSXApp } from "client/components/TeamUI";

@Controller()
export class UI implements OnStart {
	private root: ReactRoblox.Root | undefined;
	private readonly playerGUI: PlayerGui;

	constructor() {
		this.playerGUI = Players.LocalPlayer.WaitForChild("PlayerGui") as PlayerGui;
	}

	onStart(): void {
		// Function to render multiple UI components
		const renderUI = () => {
			print("UI rendered");

			// Cleanup previous root if it exists
			if (this.root) {
				this.root.unmount();
			}

			// Create new root folder (in case PlayerGui was cleared)
			const rootFolder = new Instance("Folder") as unknown as Folder;
			rootFolder.Name = "rootFolder";
			rootFolder.Parent = this.playerGUI;

			// Create new React root
			this.root = ReactRoblox.createRoot(rootFolder);

			// Render components
			this.root.render(
				createElement(Fragment, {}, [
					createElement(BadgeAwardApp, { key: "badge" }),
					createElement(teamTSXApp, { key: "team" }),
				]),
			);
		};

		// Function to cleanup UI before character reset
		const cleanupUI = () => {
			print("UI cleanup before character reset");
			if (this.root) {
				this.root.unmount();
				this.root = undefined;
			}
		};

		// Listen for character spawns (including resets)
		Players.LocalPlayer.CharacterAdded.Connect(() => {
			renderUI();
		});

		// Listen for character removal (before reset)
		Players.LocalPlayer.CharacterRemoving.Connect(() => {
			cleanupUI();
		});

		// Handle case where character already exists on first load
		if (Players.LocalPlayer.Character) {
			renderUI();
		}
	}
}
