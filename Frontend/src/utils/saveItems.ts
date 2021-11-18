import type { IAdd } from '../types';

export default function saveItems(items: any): IAdd[] {
	function convertItem(item: any): IAdd {
		return {
			dataset: item.dataset.data,
			filter: item.filter,
			name: item.name,
			xDim: item.xDim,
			stackDim: item.stackDim
		};
	}

	return items.map(convertItem);
}
