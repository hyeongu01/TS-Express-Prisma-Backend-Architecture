import {initializeDBModel} from "@libs/model";
import logger from "@libs/logger";
import app from "./app";


async function main() {
    try {
        await initializeDBModel();

        app.listen(3000, () => {
            logger.info(`server is running!`);
        })
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

main();
