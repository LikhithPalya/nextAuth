import { connect } from "@/db/db.connect";
import {NextRequest, NextResponse} from 'next/server'
import { getDataFromToken } from "@/helper/GetDataFromToken";
import User from "@/models/user.model";

connect()

export async function GET(request: NextRequest){
    //extract data from request
    const userId = await getDataFromToken(request)
    const user = await User.findById(userId).select("-password")
    // .then((user)=>{
    //     return NextResponse.json({
    //         message: user,
    //         success: true
    //     })
    // })

    //check if there is no user
    if(!user){
        return NextResponse.json({error: "User not found"}, {status: 400})
    }

    return NextResponse.json({
        message: user,
        success: true
    })
}