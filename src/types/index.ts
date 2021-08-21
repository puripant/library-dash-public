export type TData = {
	id: number;
	year: number;
	month: number;
	day: string;
	faculty: string;
	library: string;
	period: string;
};

export type TDataCB = (
	data: Array<TData>,
	xDim: string,
	stackDim: string,
	filter?: {
		dim: string;
		value: string | number;
	}
) => Array<TBardata>;

export type TBardata = { x: string; y: { x2: string; y2: number }[] };

export type TStadckdata = { x2: string; y2: number; y: number; prev: number };
