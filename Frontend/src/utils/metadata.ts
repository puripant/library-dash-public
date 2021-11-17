const metadata = {
	rent: {
		year: 'ปีที่ยืม',
		month: 'เดือนที่ยืม',
		day: 'วันที่ยืม',
		faculty: 'ประเภทบุคลากร',
		library: 'ห้องสมุด',
		period: 'ช่วงเวลาของวัน',
		title: 'ชื่อหนังสือ'
	},
	book: {
		title: 'ชื่อหนังสือ',
		library: 'ห้องสมุด',
		language_code: 'ภาษา',
		year: 'ปีที่นำเข้า',
		month: 'เดือนที่นำเข้า',
		internal_use_count: 'จำนวนครั้งที่ถูกยืม'
	},
	patron: {
		ptype: 'ประเภทสมาชิก',
		library: 'ห้องสมุด',
		renewal_total: 'จำนวนการต่ออายุ',
		checkout_total: 'จำนวนการยืม'
	}
};

export type TMetadata = typeof metadata;
export default metadata;
