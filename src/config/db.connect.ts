import mongoose from "mongoose";

export const dbConnector = (dbUrl: string) => {
    if (!dbUrl) {
        throw new Error('Db url as an empty');
    };

    mongoose.connect(dbUrl).then(() => {
        console.log(`Db connected !`);
    }).catch(error => {
        console.log(`Db connection error : ${error}`);
    })
};