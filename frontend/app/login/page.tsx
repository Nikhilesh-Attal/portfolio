"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e:React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try{
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if(!response.ok){
                throw new Error("Login fail error occurred");
            }

            //store token in localStoreage
            localStorage.setItem("adminToken", data.token);

            //redirect to admin dashoard
            router.push("/admin");

        }catch(error : any){
            setError(error.message);
        }finally{
            setIsLoading(false);
        }
    }
        
    return(
            <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
                <Card className="w-full max-w-md">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold tracking-tight">Admin Gateway</CardTitle>
                        <CardDescription>Enter your credentials to access the CMS.</CardDescription>
                    </CardHeader>

                    <CardContent>
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Input id="email" type="email" placeholder="email@example.xyz" value={email} onChange={(e) => {setEmail(e.target.value)}} required />
                            </div>

                            <div className="space-y-2">
                                <div className="relative">
                                    <Input 
                                        id="password" 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="••••••••" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required 
                                        className="pr-10"/>

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-foreground"
                                        onClick={() => setShowPassword(!showPassword)}
                                        tabIndex={-1}>
                  
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" aria-hidden="true" />
                                                ) : (
                                            <Eye className="h-4 w-4" aria-hidden="true" />
                                        )}
                                    </Button>
                                </div>
                            </div>

                            {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                            <Button className="w-full" type="submit" disabled={isLoading}>
                                {isLoading ? "Authentication..." : "Sign In"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        )
    
}