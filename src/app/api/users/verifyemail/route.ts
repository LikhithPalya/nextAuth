import { connect } from "@/db/db.connect";
import User from "@/models/user.model";
import {NextRequest, NextResponse} from 'next/server'

connect()

export async function POST(request: NextRequest){
    try {
        const body = await request.json()
        const {token} = body
        console.log(token);

        
        const user = await User.findOne({verifyToken: token, verifyTokenExpiry: {$gt:Date.now()}}) //the verificatoin date should be greater than the current one
        
        if(!user) return NextResponse.json({error:"Token doesnt exist"}, {status: 400})
        
        console.log(user);

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpire = undefined

        await user.save()

        return NextResponse.json({
            message:"email verified successfulle!",
            success: true
        }, {status: 200})
            

        



    } catch (error) {
        console.log("Error while verifying email: ");
        return NextResponse.json({error:error.message},{status:500})
        
    }
}