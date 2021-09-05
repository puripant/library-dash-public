import type { ColorMap } from '../utils/barcolors';
import type { TMetadata } from '../utils/metadata';
import type { ValueOf } from './helper';

export type TRent = {
	id: number;
	year: number;
	month: number;
	day: string;
	faculty: string;
	library: string;
	period: string;
};

export type TBook = {
	title: string;
	library: string;
	internal_use_count: number;
	language_code: string;
	year: number;
	month: number;
	day: string;
	period: string;
};

export type TData = Array<TRent> | Array<TBook>;

export type TFilter = {
	dim: string;
	value: string | number;
};

export type TDataCB = (
	data: TData,
	xDim: string,
	stackDim: string,
	filter?: TFilter[]
) => Array<TBardata>;

export type TBardata = { x: string; y: { x2: string; y2: number }[] };

export type TStackdata = { x2: string; y2: number; y: number; prev: number };

export enum Dataset {
	Rent = 'Rent',
	Book = 'Book'
}

export type TDataset = {
	[key in keyof typeof Dataset]: {
		title: string;
		data: TData;
		metadata: TMetadata[keyof TMetadata];
		colorMap: ColorMap;
	};
};

export type TAdd = (
	dataset: ValueOf<TDataset>,
	name: string,
	xDim: string,
	stackDim: string,
	filter: TFilter[]
) => void;
