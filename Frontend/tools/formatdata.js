const fs = require('fs');

const f = fs.readFileSync('./bookname.json');

const temp1 = JSON.parse(f);
const content = JSON.stringify(
	temp1.map((s) => {
		return {
			...s,
			checkout_total: [{ key: 'total', count: s.checkout_total }],
			renewal_total: [{ key: 'total', count: s.renewal_total }],
			internal_use_count: [{ key: 'total', count: s.internal_use_count }]
		};
	})
).replaceAll('\\', '');

fs.writeFileSync('./data.json', content);
