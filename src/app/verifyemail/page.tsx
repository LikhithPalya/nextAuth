"use client";
// WHAT THIS DOES??  USER GETS EMAIL, VERIFIES EMAIL SO WE CLICK ON THE LINK AND GETS REDIRECTED 
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState,useCallback } from "react";


export default function VerifyEmailPage() {

    const [token, setToken] = useState(""); //the nos after the equal to symbol
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = useCallback(async () => {
        try {
            await axios.post('/api/users/verifyemail', {token})
            setVerified(true);
            setError(false)
        } catch (error:any) {
            setError(true);
            console.log(error.reponse.data);
            
        }
    
    }, [token]); 

    //WE ARE EXTRACTING TOKEN FROM THE URL AS SOON AS THE USER COMES TO THIS PAGE
    useEffect(() => {
        const urlToken = window.location.search.split("=") [1]; // using equalto because thats how we are storing url in verifyemail 
        setToken(urlToken || "");
    }, []);


    useEffect(() => {
        if(token.length > 0) {
            verifyUserEmail();
        }
    }, [token, verifyUserEmail]);
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">

            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">
                        Login
                    </Link>
                </div>
            )}
            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error</h2>
                    
                </div>
            )}
        </div>
    )

}