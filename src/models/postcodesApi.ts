
import axios from "axios";
import * as config from "config";

const postcodesApiUrl = config.get<string>("postcodesApi.url");

export namespace postcodesApi {

    export interface ILocation {
        postcode: string;
        latitude: number;
        longitude: number;
    }

    export const getPostcode = async (postcode: string): Promise<ILocation | undefined> => {

        const response = await axios.get(`${postcodesApiUrl}/postcodes/${postcode}`);

        if (response.status !== 200)
            return undefined;

        const result = response.data.result;

        return {
            postcode,
            latitude: result.latitude,
            longitude: result.longitude,
        };
    };

    export const getBatchPostcodes = async (postcodes: string[]): Promise<ILocation[] | undefined> => {

        const data = {
            postcodes
        };

        const response = await axios.post(`${postcodesApiUrl}/postcodes`, data);

        if (response.status !== 200)
            return undefined;

        let result: any[] = response.data.result;

        // remove failures
        result = result.filter((item: any) => item.result !== null);

        // map result
        result = result.map((item: any): ILocation => {
            return {
                postcode: item.query,
                latitude: item.result.latitude,
                longitude: item.result.longitude,
            };
        });

        if (result.length === 0)
            return undefined;

        return result;
    };
};
