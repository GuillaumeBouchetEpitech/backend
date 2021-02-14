
import app from "./src/main";
import * as config from "config";

const serverPort = config.port || 3000;

app.listen(serverPort, () => {
    console.log(`server listening on port ${serverPort}`);
});
