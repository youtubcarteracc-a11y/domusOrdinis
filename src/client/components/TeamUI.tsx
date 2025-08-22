// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useMotion } from "@rbxts/pretty-react-hooks";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from "@rbxts/react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Ripple, { spring } from "@rbxts/ripple";

export function App() {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [count, setCount] = useState(0);
	const [binding, motion] = useMotion(UDim2.fromScale(0.5, 0.5));
	const [color, colorMotion] = useMotion(new Color3(math.random(), math.random(), math.random()));
	return (
		<screengui IgnoreGuiInset={true}>
			<textlabel
				Text={`Count: ${count}`}
				TextScaled={true}
				Size={binding}
				BackgroundColor3={color}
				AnchorPoint={new Vector2(0.5, 0.5)}
				Position={UDim2.fromScale(0.5, 0.5)}
				Event={{
					MouseEnter: () => {
						motion.spring(UDim2.fromScale(0.57, 0.57), Ripple.config.spring.stiff);
						colorMotion.spring(
							new Color3(math.random(), math.random(), math.random()),
							Ripple.config.spring.stiff,
						);
					},
					MouseLeave: () => {
						motion.spring(UDim2.fromScale(0.5, 0.5), Ripple.config.spring.stiff);
						motion.onComplete(() => {});
						colorMotion.spring(
							new Color3(math.random(), math.random(), math.random()),
							Ripple.config.spring.stiff,
						);
					},
					InputBegan: (rbx: TextLabel, input: InputObject) => {
						if (input.UserInputType === Enum.UserInputType.MouseButton1) {
							setCount(count + 1);
						}
					},
				}}
			/>
		</screengui>
	);
}
