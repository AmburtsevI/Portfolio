export const variantsValues = {
	create: {
		title: 'Создать',
		buttonText: 'Создать',
	},
	edit: {
		title: 'Изменить',
		buttonText: 'Сохранить',
	},
}

export const typesValues = {
	house: {
		name: {
			placeholder: 'Название',
		},
	},
	rooms: {
		name: {
			placeholder: 'Название',
		},
		house_id: {
			select: true,
			placeholder: 'Дом',
		},
	},
	device: {
		name: {
			placeholder: 'Название',
		},
		type: {
			placeholder: 'Тип',
			select: true,
		},
	},
}

export const typesTranslate = {
	space: 'область',
	house: 'квартира',
	room: 'комната',
	device: 'устройство',

	spaces: 'область',
	houses: 'квартиру',
	rooms: 'комнату',
	devices: 'устройство',
}
