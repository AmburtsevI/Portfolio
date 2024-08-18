import { writable } from 'svelte/store'

const create = () => {
	const selectedHouse = writable<number | null>(
		Number(localStorage.getItem('selectedHouse')) ?? null,
	)
	const { set: setHouses } = selectedHouse

	const selectHouse = (value) => {
		if (value !== null) {
			value = typeof value !== 'number' ? Number(value) : value
			localStorage.setItem('selectedHouse', JSON.stringify(value))
		}
		setHouses(value)
	}

	return {
		selectedHouse: {
			...selectedHouse,
			set: selectHouse,
		},
	}
}

export default create
