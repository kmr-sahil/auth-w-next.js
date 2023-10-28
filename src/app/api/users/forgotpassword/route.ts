
import  {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel.js";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer"

connect() 

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        const user = await User.findOne({email})
        console.log(user)

        if(!user){
            return NextResponse.json({error: "User don't exists"}, {status: 400})
        }

        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({
            message: "Send Mail Successfully",
            success: true,
        })

    } catch (error: any) {
        console.error("Error parsing JSON:", error);
    return NextResponse.json({ error: "Invalid JSON data" }, { status: 400 });
    }
}
