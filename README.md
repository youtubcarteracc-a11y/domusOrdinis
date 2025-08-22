# Roblox TypeScript Game with Flamework

This is a Roblox game built with TypeScript and Flamework framework.

## Features

- **Player Data Management**: Firebase integration for persistent player data
- **Event System**: Automatic player event handling that waits for data to be loaded
- **TypeScript**: Full TypeScript support with proper type safety

## Player Events System

The `OnPlayerEvents` service now automatically waits for player data to be loaded before triggering events. This ensures that all player-related functionality has access to the player's data when it's needed.

### Available Interfaces

#### `OnPlayerJoined`
```typescript
export interface OnPlayerJoined {
    onPlayerJoined(player: Player, playerData: PlayerDataTemplate): void;
}
```
This interface is triggered when a player joins the game AND their data has been loaded.

#### `OnPlayerDataLoaded`
```typescript
export interface OnPlayerDataLoaded {
    onPlayerDataLoaded(player: Player, playerData: PlayerDataTemplate): void;
}
```
This interface is specifically triggered when player data is loaded, regardless of when the player joined.

### Usage Example

```typescript
import { OnStart, Service } from "@flamework/core";
import { OnPlayerDataLoaded } from "shared/services/utils/onPlayerEvents";
import { PlayerDataTemplate } from "shared/services/templates/playerDataTemplate";

@Service()
export class MyService implements OnStart, OnPlayerDataLoaded {
    onStart(): void {
        print("Service started - waiting for player data...");
    }

    onPlayerDataLoaded(player: Player, playerData: PlayerDataTemplate): void {
        // This will only run AFTER the player's data is loaded
        print(`Welcome ${playerData.player.username}! You have ${playerData.player.money} money.`);
        
        // Now you can safely use the player data
        this.setupPlayer(player, playerData);
    }

    private setupPlayer(player: Player, playerData: PlayerDataTemplate): void {
        // Safe to use playerData here
    }
}
```

### How It Works

1. **Player Joins**: When a player joins, the system starts waiting for their data
2. **Data Loading**: The Firebase system loads/creates the player's data
3. **Event Triggering**: Once data is available, all registered listeners are notified
4. **Safe Execution**: Your code can now safely access player data without null checks

### Benefits

- **No More Race Conditions**: Events only fire when data is actually available
- **Cleaner Code**: No need for manual data loading checks
- **Better Performance**: Avoids unnecessary processing while waiting for data
- **Type Safety**: Full TypeScript support with proper interfaces

## Project Structure

```
src/
├── client/          # Client-side code
├── server/          # Server-side code
├── shared/          # Shared code between client and server
│   └── services/
│       └── utils/
│           └── onPlayerEvents.ts  # Player event system
└── templates/
    └── playerDataTemplate.ts      # Player data structure
```

## Getting Started

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. The system will automatically handle player data loading and event triggering

## Dependencies

- Flamework framework
- Roblox TypeScript
- Firebase integration for data persistence
