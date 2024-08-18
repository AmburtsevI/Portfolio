import { axiosInstance } from "./http";

export const getAllRooms = async () => {
    try {
        const { data } = await axiosInstance.get('/room/allinhouse/7');
        return data
    } catch (error) {
        throw error
    }
}