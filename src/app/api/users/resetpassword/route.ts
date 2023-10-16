import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connect()

export async function  PUT(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {oldPassword, newPassword, userId} = reqBody;

        const user = await User.findOne({_id: userId})

        if(!user) {
            return NextResponse.json({error: "Invalid User"}, {status: 400})
        }

        //check for correct password
        const validPassword = await bcryptjs.compare(oldPassword, user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Password Invalid"}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(newPassword, salt);

        user.password = hashedPassword
        await user.save();

        const response = NextResponse.json({
            message: "Password Changed & Logout",
            success: true
        })

        response.cookies.set("token", "",
        {
            httpOnly: true,
            expires: new Date(0)
        })

        return response;
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}