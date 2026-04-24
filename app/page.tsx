"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SplashScreen from "@/components/SplashScreen";

export default function Home() {
    const router = useRouter();
    return <SplashScreen onDismiss={() => router.push("/chords")} />;
}
