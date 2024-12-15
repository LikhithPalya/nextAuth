import { connect } from "@/db/db.connect";
import User from "@/models/user.model";
import {NextRequest, NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import {sendEmail} from '@/helper/mail.helper'


connect()

export async function POST(request: NextRequest){
    try {
        const requestBody = await request.json() //ways of getting a request
        const {username, email, password} = requestBody
        //Validation 
        console.log(requestBody);

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exists"}, {status: 400})
        }
        // hashing password using bcrypt
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)
        
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send the verification email!
        await sendEmail({email,emailType:"VERIFY", userId: savedUser._id})
        
        return NextResponse.json({
            username,
            email,
            savedUser,
            message:"user registered successfully",
            success:true
        })
        
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status: 500})
        console.log(error);
    }
}