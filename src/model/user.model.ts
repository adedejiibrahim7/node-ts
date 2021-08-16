import mongoose from "mongoose"
import bcrypt from "bcrypt"
import config from "../../config/default"


export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: sring;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>
}

const userSchema = new mongoose.Schema(
    {
        email: {type: String, required: true, unique: true},
        name: { type: String, required: true},
        password: { type: String, required: true}
    },
    { timestamps: true }
)

userSchema.pre('save', async (next: mongoose.HookNextFunction) => {
    const user = this as UserDocument;

    if(!user.isModified('password')) {
        return next();
    } 

    const salt = await bcrypt.genSalt(config.saltWorkFactor)

    const hash = await bcrypt.hashSync(user.password, salt)

    return next()
})

userSchema.methods.comparePassword = async (candidatePassword: string)=>{
    const user = this as UserDocument

    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
}

const User = new mongoose.model<UserDocument>("User", userSchema)

export default User