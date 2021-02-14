
import axios from "axios";
import * as config from "config";

const url = config.get<string>("openweathermapApi.url");
const apiKey = config.get<string>("openweathermapApi.apiKey");

export namespace openweathermapApi {

    export const getWeatherForecast = async (latitude: number, longitude: number): Promise<any | undefined> => {

        const response = await axios.get(`${url}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);

        if (response.status !== 200)
            return undefined;

        return response.data;
    };
};
