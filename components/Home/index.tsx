"use client"

import Hero from "@/components/Hero";
import Separator from "@/components/Separator";
import Feature from "@/components/Features";
import About from "@/components/About";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import { useSession } from "@/types/useSession";
import { useEffect, useState } from "react";
import Dashboard from "../Dashboard";

export default function HomePage() {
    const {user, userId}= useSession();
    const [userLogged, setUserLogged] = useState(false);

    useEffect(() => {
        if (user) {
            setUserLogged(true);
        }
    }, [user]);

    return (
        <main>
            <Hero userLogged={userLogged} username={user || ''} />
            <Separator />
            {!userLogged ? (
                <>
                    <Feature />
                    <About />
                    <CTA />
                    <FAQ />
                    <Newsletter />
                </>
            ) : (
                <Dashboard />
            )
            }   
        </main>
    );
}