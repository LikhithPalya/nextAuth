import { connect } from "@/db/db.connect";
import User from "@/models/user.model";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const{email, password} = reqBody

        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "User doesnt exist"}, {status:400})
        }

        console.log(" User exists");
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
            return NextResponse.json({error: "wrong password "}, {status:400})
        }

        //now since password is valid, now we make token
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign( tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'} ) // to generate signed token

        const response = NextResponse.json({
            message: "LoggedIn successfully",
            success: true
        })

        response.cookies.set("token", token, {httpOnly: true})
        
        return response

    } catch (error:any) {
        return NextResponse.json({error: "error loggin out, try again"+ error.message}, {status: 500})
        
    }
}