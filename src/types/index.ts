export type TData = {
	id: number;
	year: number;
	month: number;
	day: string;
	faculty: string;
	library: string;
	period: string;
};

export type TFilter = {
	dim: string;
	value: string | number;
};

export type TDataCB = (
	data: Array<TData>,
	xDim: string,
	stackDim: string,
	filter?: TFilter[]
) => Array<TBardata>;

export type TBardata = { x: string; y: { x2: string; y2: number }[] };

export type TStackdata = { x2: string; y2: number; y: number; prev: number };
