
import * as express from "express";

import * as middlewares from "./middlewares";
import * as controllers from "./controllers";

const app = express();

if (process.env.NODE_ENV !== "test") {
    app.use(middlewares.accessLogger);
    app.use(middlewares.trafficeHandler);
}

app.get("/postcodes/:postcodes",    controllers.getPostcodes);
app.get("/weather",                 controllers.getWeatherForecast);
app.get("/address",                 controllers.getAddress);

export default app;
