import { writable } from 'svelte/store';

export const BASE_DIMENSIONS = {
	LOCATION: 'สถานที่',
	FACULTY: 'คณะ',
	HOUR: 'เวลา (ชั่วโมง)',
	YEAR: 'เวลา (ปี)',
	LANGUAGE: 'ภาษา'
};

const basedim = writable(BASE_DIMENSIONS.FACULTY);

export default basedim;
