import  {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;

        const user = await User.findOne({email})
        console.log("Hereeeee it is", user)

        //check for user
        if(!user) {
            return NextResponse.json({error: "User not exist"}, {status: 400})
        }

        //check for correct password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Password Invalid"}, {status: 400})
        }

        //create a token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,

        }

        const token = jwt.sign( tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Succesfully Log In",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,  
        })

        return response;


    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}