import { OnStart, Service } from "@flamework/core";
import { Events } from "server/network";
import { Players, Teams } from "@rbxts/services";

interface TeamConfig {
	key: string;
	groupName: string;
	groupId?: number;
	userId?: number | number[];
	teamName: string;
}

const teams: TeamConfig[] = [
	{
		key: "HP",
		groupName: "Holy Protectorate",
		groupId: 5048000,
		teamName: "Holy Protectorate",
	},
	{
		key: "BP",
		groupName: "Blitz Personnel",
		groupId: 3174707,
		teamName: "Blitz Personnel",
	},
	{
		key: "BA",
		groupName: "Blitz Authority",
		groupId: 11376804,
		userId: 984931618,
		teamName: "Blitz Authority",
	},
	{
		key: "IM",
		groupName: "Imperator",
		userId: [984931618, 95288873, 17346469],
		teamName: "Imperator",
	},
	{
		key: "VI",
		groupName: "Visitor",
		teamName: "Visitor",
	},
];
@Service()
export class teamService implements OnStart {
	public checkTeams(player: Player, teamName: string) {
		const teamConfig = teams.find((team) => team.groupName === teamName);
		if (!teamConfig) return;

		let canJoinTeam = false;

		// Check if player can join team based on configuration
		if (teamConfig.groupId && this.checkIfInGroup(player.UserId, teamConfig.groupId)) {
			canJoinTeam = true;
		}

		if (teamConfig.userId) {
			if (typeIs(teamConfig.userId, "table")) {
				// Array of user IDs (like Imperator)
				canJoinTeam = teamConfig.userId.includes(player.UserId);
			} else {
				// Single user ID (like Blitz Authority special user)
				canJoinTeam = player.UserId === teamConfig.userId;
			}
		}

		// Visitor team has no restrictions
		if (teamConfig.key === "VI") {
			canJoinTeam = true;
		}

		if (canJoinTeam) {
			player.Team = Teams.FindFirstChild(teamConfig.teamName) as Team;
			if (teamConfig.key === "HP") {
				print(player.Team);
			}
		}
	}

	public checkIfInGroup(playerId: number, groupId: number) {
		const player = Players.GetPlayerByUserId(playerId);
		if (player?.IsInGroup(groupId)) {
			return true;
		}
		return false;
	}

	onStart(): void {
		Events.sendTeamRequest.connect((player: Player, teamName: string) => {
			this.checkTeams(player, teamName);
		});
	}
}
