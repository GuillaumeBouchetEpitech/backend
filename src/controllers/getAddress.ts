
import * as express from "express";

import logger from "../utilities/logger";

import * as models from "../models";

export const getAddress = async (req: express.Request, res: express.Response) => {

    //
    //
    // extract/validate input(s)

    const latitudeParam = req.query.latitude;
    const longitudeParam = req.query.longitude;

    if (typeof latitudeParam !== "string")
        return res.status(400).json({ message: "missing latitude parameter" });
    if (typeof longitudeParam !== "string")
        return res.status(400).json({ message: "missing longitude parameter" });

    const latitude = parseFloat(latitudeParam);
    const longitude = parseFloat(longitudeParam as string);

    if (isNaN(latitude))
        return res.status(400).json({ message: "invalid latitude parameter, not a number" });
    if (isNaN(longitude))
        return res.status(400).json({ message: "invalid longitude parameter, not a number" });

    //
    //
    // query data

    try {

        const data = await models.nominatimApi.getAddress(latitude, longitude);

        if (!data)
            return res.sendStatus(404);

        res.json(data);
    }
    catch (err) {

        logger.error(`nominatimApi exception, message: ${err.message}`);

        res.sendStatus(500);
    }
};
