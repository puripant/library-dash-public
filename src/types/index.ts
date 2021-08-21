export type TData = {
	id: number;
	year: number;
	month: number;
	day: string;
	faculty: string;
	library: string;
	period: string;
};

export type TDataCB = (data: Array<TData>, basedim: string, dim: string) => Array<TBardata>;

export type TBardata = { x: string; y: { x2: string; y2: number }[] };

export type TStadckdata = { x2: string; y2: number; y: number; prev: number };
