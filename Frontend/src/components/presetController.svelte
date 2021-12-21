<script lang="ts">
	import type { IAdd, TAdd, TDataset } from '../types';

	export let dataset: TDataset, add: TAdd;

	const PRESETS: { name: string; note?: string; cards: IAdd[] }[] = [
		{
			name: 'วิศวกรรมการประปา (ยืม vs ห้องสมุด)',
			note: 'หอกลางมีหลังสือวิศวกรรมการประปาเยอะ (90+ เล่ม) ในคณะที่มีการยืมเพียง 1 ครั้ง กลับกันที่ห้องสมุดวิศวกรรมศาสตร์มีการยืม 8 ครั้ง แต่มีหนังสือที่ห้องสมุดวิศวกรรมศาสตร์น้อยกว่าหอกลาง',
			cards: [
				{
					dataset: dataset['Book'],
					name: '-',
					xDim: 'library',
					stackDim: 'library',
					filter: [{ dim: 'title', value: 'วิศวกรรมการประปา' }]
				},
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'library',
					stackDim: 'faculty',
					filter: [{ dim: 'title', value: 'วิศวกรรมการประปา' }]
				}
			]
		},
		{
			name: 'ฟิสิกส์ 1 (ยืม vs ห้องสมุด)',
			note: 'หนังสือฟิสิกส์ 1 มีการถูกยืมที่ห้องสมุดคณะวิทยาศาสตร์ 35 ครั้ง ในขณะที่ห้องสมุดคณะวิทยาศาสตร์มีหนังสือ 44 เล่ม แต่ที่ห้องสมุดคณะวิศวกรรมศาสตร์ที่มีหนังสือ 56 เล่ม กลับมีการยืมเพียง 14 ครั้ง',
			cards: [
				{
					dataset: dataset['Book'],
					name: '-',
					xDim: 'library',
					stackDim: 'library',
					filter: [{ dim: 'title', value: 'ฟิสิกส์ 1' }]
				},
				{
					dataset: dataset['Rent'],
					name: '-',
					xDim: 'library',
					stackDim: 'faculty',
					filter: [{ dim: 'title', value: 'ฟิสิกส์ 1' }]
				}
			]
		},
		{
			name: 'เวลาที่เข้ายืมที่หอกลาง',
			note: 'คณะอักษรศาสตร์กับคณะศึกษาศาสตร์ที่มีการยืมหนังสือจากหอกลางมากที่สุด มีลักษณะการยืมในช่วงเวลาที่แตกต่างกัน โดยคณะอักษรศาสตร์จะเข้ายืมช่วงเช้ามากกว่าคณะศึกษาศาสตร์ และคณะศึกษาศาสตร์จะเข้ายืมช่วงเย็นมากกว่าคณะอักษรศาสตร์',
			cards: [
				{ dataset: dataset['Rent'], filter: [], name: '-', xDim: 'library', stackDim: 'library' },
				{
					dataset: dataset['Rent'],
					filter: [{ dim: 'library', value: 'Central Library' }],
					name: '-',
					xDim: 'faculty',
					stackDim: 'faculty'
				},
				{
					dataset: dataset['Rent'],
					filter: [
						{ dim: 'library', value: 'Central Library' },
						{ dim: 'faculty', value: 'Education' }
					],
					name: '-',
					xDim: 'day',
					stackDim: 'period'
				},
				{
					dataset: dataset['Rent'],
					filter: [
						{ dim: 'library', value: 'Central Library' },
						{ dim: 'faculty', value: 'Arts' }
					],
					name: 'ห้องสมุด: Central Library\nประเภทบุคลากร: Arts',
					xDim: 'faculty',
					stackDim: 'faculty'
				}
			]
		},
		{
			name: 'คณะที่บุตลากรใช้หอกลางมากกว่าห้องสมุดตัวเอง',
			note: 'คณะศึกษาศาสตร์ใช้ห้องสมุดหอกลางเป็นสัดส่วนมากกว่าคณะอื่น ๆ รวมไปถึงหอกลางมีจำนวนสมาชิกจากบุคลากรคณะศึกษามากกว่าห้องสมุดคณะศึกษาศาสตร์เอง',
			cards: [
				{
					dataset: dataset['Patron'],
					filter: [],
					name: '-',
					xDim: 'library',
					stackDim: 'ptype'
				},
				{
					dataset: dataset['Patron'],
					filter: [{ dim: 'ptype', value: 'Arts' }],
					name: 'ประเภทสมาชิก: Arts',
					xDim: 'library',
					stackDim: 'ptype'
				},
				{
					dataset: dataset['Patron'],
					filter: [{ dim: 'ptype', value: 'Education' }],
					name: 'ประเภทสมาชิก: Education',
					xDim: 'library',
					stackDim: 'ptype'
				},
				{
					dataset: dataset['Patron'],
					filter: [{ dim: 'ptype', value: 'Architecture' }],
					name: 'ประเภทสมาชิก: Architecture',
					xDim: 'library',
					stackDim: 'ptype'
				},
				{
					dataset: dataset['Patron'],
					filter: [{ dim: 'ptype', value: 'Science' }],
					name: 'ประเภทสมาชิก: Science',
					xDim: 'library',
					stackDim: 'ptype'
				}
			]
		},
		{
			name: 'หนังสือที่ไม่ใช่ภาษาไทยและอังกฤษ',
			note: 'หนังสือที่ไม่ใช่ภาษาไทยและอังกฤษส่วนใหญ่อยู่ที่ห้องสมุดอักษรศาสตร์',
			cards: [
				{
					dataset: dataset['Book'],
					filter: [],
					name: '-',
					xDim: 'language_code',
					stackDim: 'library'
				},
				{
					dataset: dataset['Book'],
					filter: [{ dim: 'language_code', value: 'fre' }],
					name: 'ภาษา: fre',
					xDim: 'library',
					stackDim: 'language_code'
				},
				{
					dataset: dataset['Book'],
					filter: [{ dim: 'language_code', value: 'jpn' }],
					name: 'ภาษา: jpn',
					xDim: 'library',
					stackDim: 'language_code'
				},
				{
					dataset: dataset['Book'],
					filter: [{ dim: 'language_code', value: 'chi' }],
					name: 'ภาษา: chi',
					xDim: 'library',
					stackDim: 'language_code'
				},
				{
					dataset: dataset['Book'],
					filter: [{ dim: 'language_code', value: 'ger' }],
					name: 'ภาษา: ger',
					xDim: 'library',
					stackDim: 'language_code'
				}
			]
		}
	];
	let selectedPreset = PRESETS[0];
</script>

<div class="flex flex-col mb-5 pb-5 border-b-2 ">
	<h2 class="text-xl text-center">Preset</h2>
	<div class="flex flex-col">
		<h3 class="dataset-title">เลือก Preset</h3>
		<select bind:value={selectedPreset}>
			{#each PRESETS as preset (preset)}
				<option value={preset}>
					{preset.name}
				</option>
			{/each}
		</select>
	</div>
	<button
		class={`bg-blue-400 text-white px-2 py-1 mt-3 rounded`}
		on:click={() => {
			for (const preset of selectedPreset.cards) {
				add(preset);
			}
		}}>Add</button
	>
</div>

<style>
	.dataset-title {
		@apply m-3;
	}

	select {
		@apply border;
		@apply p-1;
		@apply rounded;
	}
</style>
