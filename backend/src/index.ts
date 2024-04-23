import express,{Request,Response} from 'express';
import cors from 'cors';
import 'dotenv/config'; // loads the environment variable when the app starts 
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string) ;  // reason to cast as string because if any error, anyway the app would not work

const app = express();

//Helps in parsing responses into json 
app.use(express.json());
//Helps with receiving url parameters 
app.use(express.urlencoded({extended: true}));
//Helps with security 
app.use(cors());

app.get('/api/test', async (req: Request, res: Response) => {  // Request and Response are types for req and res
    res.json({message: "Hello from json object"});
});

app.listen(7000, ()=> {
    console.log("Server is listening on port 7000");
})