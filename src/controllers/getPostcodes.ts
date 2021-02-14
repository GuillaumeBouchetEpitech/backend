
import * as express from "express";

import logger from "../utilities/logger";

import * as models from "../models";

export const getPostcodes = async (req: express.Request, res: express.Response) => {

    //
    //
    // extract/validate input(s)

    let postcodes = req.params.postcodes.split(",");

    // filter out the empty strings
    if (postcodes.length > 1)
        postcodes = postcodes.filter((item: string) => item.length > 0);

    if (postcodes.length == 0)
        return res.status(400).json({ message: "empty postcode(s) value" });

    //
    //
    // query data

    try {

        let data: any = undefined;

        if (postcodes.length === 1)
            data = await models.postcodesApi.getPostcode(postcodes[0]);
        else
            data = await models.postcodesApi.getBatchPostcodes(postcodes);

        if (!data)
            return res.sendStatus(404);

        res.json(data);
    }
    catch (err) {

        logger.error(`postcodesApi exception, message: ${err.message}`);

        res.sendStatus(500);
    }
};
