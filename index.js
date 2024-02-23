import app from "./app.js";
import 'dotenv/config'

import mongodbconnection from "./src/databases/connect.js";
const port=process.env.PORT;
///startng the server
mongodbconnection()
    .then(()=>{
        app.listen(port, () => {
            console.log(`app is listening at port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Error in starting server:", error);
    });