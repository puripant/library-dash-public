import { writable } from 'svelte/store';

export type TTooltip = {
	top: number;
	left: number;
	xDim: string;
	xDatum: string;
	stackDim: string;
	stackDatum: string;
	count: number;
} | null;

export const tooltip = writable<TTooltip>(null);
