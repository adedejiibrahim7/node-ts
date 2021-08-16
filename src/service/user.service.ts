import { DocumentDefinition } from "mongoose";
import user, {UserDocument} from "../model/user.model"

export async function createUser(input:DocumentDefinition<UserDocument>) {
    
    try{
        return await user.create(input)
    }catch{
        throw new Error(error)
    }
}

const findUser = ()=>{
    
}