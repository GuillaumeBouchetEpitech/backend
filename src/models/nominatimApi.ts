
import axios from "axios";
import * as config from "config";

const url = config.get<string>("nominatimApi.url");

export namespace nominatimApi {

    export const getAddress = async (latitude: number, longitude: number): Promise<any | undefined> => {

        const response = await axios.get(`${url}/reverse?lat=${latitude}&lon=${longitude}&format=json`);

        if (response.status !== 200)
            return undefined;

        return response.data;
    };
};
