import { writable } from 'svelte/store';

export const BASE_DIMENSIONS = {
	location: 'สถานที่',
	faculty: 'คณะ',
	hour: 'เวลา (ชั่วโมง)',
	year: 'เวลา (ปี)',
	language: 'ภาษา'
};

const basedim = writable(BASE_DIMENSIONS.FACULTY);

export default basedim;
