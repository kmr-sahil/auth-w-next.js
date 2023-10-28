
import  {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect() 

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {token, pass} = reqBody

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}});
        console.log("here is ", user)

        if (!user) {
            return NextResponse.json({error: "Invalid token"}, {status: 400})
        }

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(pass, salt);

        user.password = hashedPassword
        await user.save();

        const response = NextResponse.json({
            message: "Password changed Successfully",
            success: true,
        })

        return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
