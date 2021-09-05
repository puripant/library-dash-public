const metadata = {
	rent: {
		year: 'ปีที่ยืม',
		month: 'เดือนที่ยืม',
		day: 'วันที่ยืม',
		faculty: 'ประเภทบุคลากร',
		library: 'ห้องสมุด',
		period: 'ช่วงเวลาของวัน',
		title: 'หนังสือ'
	},
	book: {
		title: 'ชื่อหนังสือ',
		library: 'ห้องสมุด',
		language_code: 'ภาษา',
		year: 'ปีที่นำเข้า'
	}
};

export type TMetadata = typeof metadata;
export default metadata;
