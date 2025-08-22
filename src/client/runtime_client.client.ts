import { Flamework } from "@flamework/core";
import { StarterGui } from "@rbxts/services";

Flamework.addPaths("src/client/components");
Flamework.addPaths("src/client/controllers");
Flamework.addPaths("src/shared/components");

Flamework.ignite();
print(`Client runtime: [${script.Name}] ${os.clock()}`);
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);
