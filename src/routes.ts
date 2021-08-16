import { Express, Request, Response } from "express"
import {createUserHandler} from "./controller/user.controller"
import {validateRequest} from "../middleware/validateRequest"


export default (app: Express) =>{

    app.get('/check', (req:Request, res:Response) => {
        res.sendStatus(200);
    });

    app.post('/api/users', validateRequest(createUserSchema), createUserHandler)
}