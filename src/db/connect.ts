import mongoose from "mongoose";
import config from "../../config/default";
import log from "../logger";

const connect = () => {
    const dbUri = config.dbUri as string;

    return mongoose
        .connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(()=>{
            log.info("Database Connected")
        })
        .catch((error) => {
            log.info(error, error)
            process.exit(1)
        })
}

export default connect 