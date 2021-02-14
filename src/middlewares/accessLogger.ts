

import * as express from "express";

import logger from "../utilities/logger";

export const accessLogger = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    const startTime = Date.now();

    res.on("finish", () => {

        const endTime = Date.now();
        const elapsedTime = endTime - startTime;

        logger.info(`${res.statusCode} ${req.method} ${req.path} ${elapsedTime}ms`);
    });

    next();
};
