'use client'

import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")

    const getUserDetails = async ()=>{
       try {
         const response = await axios.get('/api/users/user-profile')
         console.log(response.data)
         setData(response.data.message._id)
       } catch (error:any) {
            console.log( "error getting user details", error);
            toast.error("Couldnt get user deets!")
       }
    } 

    const logout = async ()=>{
        try {
            await axios.get('/api/users/logout')
            toast.success("logout success")
            router.push("/login")
        } catch (error:any) {
            console.log(" error while getting user profile", error);
            toast.error(error.message)
            
        }
    }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
    <h1>Profile</h1>
    <hr />
    <p>Profile page</p>
    <h1 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}> {data}
    </Link>}</h1>
    <hr />
    <button
    onClick={logout}
    className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >Logout</button>

    <button
    onClick={getUserDetails}
    className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >GetUser Details</button>
    </div>
  )
}

export default ProfilePage