interface FiltersProps {
	searchTerm: string
	targetGroups: null | string
}

export const saveFilters	= (filters: FiltersProps) => {
	console.log(filters)
	localStorage.setItem('filters', JSON.stringify(filters));
}

export const loadFilters = () => {
	const filters = localStorage.getItem('filters');
	if (filters) {
		return JSON.parse(filters);
	}
	return {
		searchTerm: '',
		targetGroups: null
	};
}

