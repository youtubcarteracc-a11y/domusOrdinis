export interface TeamConfig {
	key: string;
	groupName: string;
	groupId?: number;
	userId?: number | number[];
	teamName: string;
	displayColor: Color3;
	imageId: string;
}

export const teams: TeamConfig[] = [
	{
		key: "HP",
		groupName: "Holy Protectorate",
		groupId: 5048000,
		teamName: "Holy Protectorate",
		displayColor: Color3.fromRGB(97, 181, 255),
		imageId: "rbxassetid://110224261383532",
	},
	{
		key: "BP",
		groupName: "Blitz Personnel",
		groupId: 3174707,
		teamName: "Blitz Personnel",
		displayColor: Color3.fromRGB(255, 48, 48),
		imageId: "rbxassetid://74624851095812",
	},
	{
		key: "BA",
		groupName: "Blitz Authority",
		groupId: 11376804,
		userId: 984931618,
		teamName: "Blitz Authority",
		displayColor: Color3.fromRGB(255, 255, 255),
		imageId: "rbxassetid://101577386819662",
	},
	{
		key: "IM",
		groupName: "Imperator",
		userId: [984931618, 95288873, 17346469],
		teamName: "Imperator",
		displayColor: Color3.fromRGB(255, 252, 160),
		imageId: "rbxassetid://100844598939084",
	},
	{
		key: "VI",
		groupName: "Visitor",
		teamName: "Visitor",
		displayColor: Color3.fromRGB(255, 255, 255),
		imageId: "rbxassetid://80496548911665",
	},
];
