
import * as express from "express";

import * as toobusy from "toobusy-js";

export const trafficeHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {

    if (toobusy())
        return res.status(503).json({ message: "server too busy." });

    next();
};
