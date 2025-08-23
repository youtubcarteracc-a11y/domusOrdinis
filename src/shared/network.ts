import { Networking } from "@flamework/networking";
import { PlayerDataTemplate } from "./services/templates/playerDataTemplate";

interface ClientToServerEvents {
	sendTeamRequest(teamName: string): void;
}

interface ServerToClientEvents {
	updatePlayerData(playerData: PlayerDataTemplate): void;
	updateAllPlayerData(playerDataMap: Map<string, PlayerDataTemplate>): void;
	requestBadgeAnimation(badgeText: string): void;
}

interface ClientToServerFunctions {
	requestPlayerData(): PlayerDataTemplate | undefined;
	requestAllPlayerData(): Map<string, PlayerDataTemplate>;
}

interface ServerToClientFunctions {}

export const GlobalEvents = Networking.createEvent<ClientToServerEvents, ServerToClientEvents>();
export const GlobalFunctions = Networking.createFunction<ClientToServerFunctions, ServerToClientFunctions>();
