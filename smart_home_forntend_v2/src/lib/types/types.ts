import type { CreateQueryResult } from '@tanstack/svelte-query'
import type { Writable } from 'svelte/store'

export interface IAuthContext {
	isAuth: Writable<boolean>
	login: (
		email: string,
		password: string,
	) => Promise<{
		success: boolean
	}>
	logout: () => void
	authQueryData: CreateQueryResult
}

export interface ISpace {
	id: number
	name: string
}

export interface IHouse {
	id: number
	name: string
}

export interface IRoom {
	id: number
	name: string
	house_id: number
}

export interface IDevice {
	id: number
	name: string
	type: string
	enabled: boolean
	active: boolean
	x: number
	y: number
	temperature?: number
	room_id?: number
	warning?: boolean
}

export interface IRoomWithDevices extends IRoom {
	devices: IDevice[]
}

export interface ISpaceWithRooms extends ISpace {
	houses: IHouse[]
}

export interface ISelectedStore {
	selectedSpace: Writable<number | null>
	selectedHouse: Writable<number | null>
}

export interface ISelectedDataStore {
	selectedSpaceData: Writable<ISpace | null>
	selectedHouseData: Writable<IHouse | null>
}

export interface IModalSettings {
	show: ({}: {
		variant: 'create' | 'edit' | 'delete' | null
		type: 'space' | 'house' | 'rooms' | 'device' | null
		initialData?: any
	}) => void
	close: () => void
	refetchSpaces: () => void
}

export interface IModalShowParams {
	variant: 'create' | 'edit' | 'delete' | null
	type: 'space' | 'house' | 'rooms' | 'device' | null
	initialData: any
}
