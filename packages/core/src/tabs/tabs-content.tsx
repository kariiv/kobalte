/*
 * Portions of this file are based on code from react-spectrum.
 * Apache License Version 2.0, Copyright 2020 Adobe.
 *
 * Credits to the React Spectrum team:
 * https://github.com/adobe/react-spectrum/blob/6b51339cca0b8344507d3c8e81e7ad05d6e75f9b/packages/@react-aria/tabs/src/useTabPanel.ts
 */

import {
	type Orientation
} from "@kobalte/utils";
import {
	Show,
	type ValidComponent,
	splitProps,
	createMemo
} from "solid-js";

import {
	type ElementOf,
	Polymorphic,
	type PolymorphicProps,
} from "../polymorphic";
import { useTabsContext } from "./tabs-context";

export interface TabsContentOptions {
	/** The unique key that associates the tab panel with a tab. */
	value: string;

	/**
	 * Used to force mounting when more control is needed.
	 * Useful when controlling animation with SolidJS animation libraries.
	 */
	forceMount?: boolean;
}

export interface TabsContentCommonProps<T extends HTMLElement = HTMLElement> {
}

export interface TabsContentRenderProps extends TabsContentCommonProps {
	role: "tabpanel";
	tabIndex: number | undefined;
	"data-orientation": Orientation;
	"data-selected": string | undefined;
}

export type TabsContentProps<
	T extends ValidComponent | HTMLElement = HTMLElement,
> = TabsContentOptions & Partial<TabsContentCommonProps<ElementOf<T>>>;

/**
 * Contains the content associated with a tab trigger.
 */
export function TabsContent<T extends ValidComponent = "div">(
	props: PolymorphicProps<T, TabsContentProps<T>>,
) {
	const context = useTabsContext();
	const [local, others] = splitProps(props as TabsContentProps, [
		"value",
		"forceMount",
	]);
	const isSelected = createMemo(() => context.listState().selectedKey() === local.value);
	return (
		<Show when={isSelected()}>
			<Polymorphic<TabsContentRenderProps>
				as="div"
				role="tabpanel"
				tabIndex={0}
				data-orientation={context.orientation()}
				data-selected={isSelected() ? "" : undefined}
				{...others}
			/>
		</Show>
	);
}
