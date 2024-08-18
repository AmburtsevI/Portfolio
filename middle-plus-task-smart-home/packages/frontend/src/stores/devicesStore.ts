// import { devicesStore } from './devicesStore';
import { writable } from "svelte/store";
import type { devices } from "../types/types";
import { devicesArr } from "../utils/devices";

export const devicesStore = writable<devices>(devicesArr);

export const updateDevices = (newDevices: devices) => {
    devicesStore.update(currentDevices => {
        return [...currentDevices, ...newDevices];
    });

};