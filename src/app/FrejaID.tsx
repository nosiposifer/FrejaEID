"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { Engine, MoveDirection } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import Particles from "@tsparticles/react";

const FrejaID = () => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [validityTime, setValidityTime] = useState(120);

  useEffect(() => {
    setCurrentTime(new Date());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setValidityTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (date: Date | null) =>
    date
      ? date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
      : "--:--:--";

  const formatDate = (date: Date | null) =>
    date ? date.toLocaleDateString("sv-SE", { day: "2-digit", month: "short" }) : "-- --";

  const particlesInit = useCallback(async (engine: unknown) => {
    const castedEngine = engine as Engine; // Castar till rätt typ
    console.log("Particles Init", castedEngine);
    await loadSlim(castedEngine);
  }, []);

  const particlesOptions = {
    fullScreen: { enable: false },
    particles: {
      number: { value: 100 },
      size: {
        value: { min: 1, max: 4 },
        animation: {
          enable: true,
          speed: 3,
          minimumValue: 1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: 1,
        direction: MoveDirection.none,
        random: true,
        straight: false,
      },
      opacity: {
        value: { min: 0.3, max: 0.8 },
        animation: {
          enable: true,
          speed: 0.5,
          minimumValue: 0.3,
          sync: false,
        },
      },
      color: { value: "#ffffff" },
    },
    interactivity: {
      events: { onHover: { enable: false } },
    },
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black relative">
      <div className="w-[97%] max-w-[420px] h-[900px] bg-gradient-to-t from-blue-600 to-blue-900 rounded-[40px] shadow-xl text-white flex flex-col items-center p-6 relative overflow-hidden z-10">
        <Particles id="tsparticles" options={particlesOptions} />

        <div className="absolute top-4 w-28 h-6 bg-black rounded-full"></div>

        {/* Navbar */}
        <div className="absolute top-[70px] flex justify-between items-center w-[90%]">
          <div className="cursor-pointer">
            <ChevronLeft size={26} strokeWidth={2} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">FREJA+</h2>
          <div className="cursor-pointer flex items-center justify-center w-6 h-6 border border-white rounded-full">
            <MoreHorizontal size={16} strokeWidth={2} className="text-white" />
          </div>
        </div>

        {/* Profile Image */}
        <div className="mt-20 w-[45vw] h-[45vw] max-w-56 max-h-56 rounded-full border-4 border-[#80cfff] overflow-hidden flex justify-center items-center">
          <Image src="/profile.jpg" alt="Profile" width={192} height={192} className="w-full h-full object-cover rounded-full" priority />
        </div>

        <p className="text-base mt-6 w-[90%] text-center">Giltigt t o m: <span className="font-bold">2024-07-21</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Efternamn: <span className="font-bold">Bengtsson</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Namn: <span className="font-bold">Emil</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Ålder: <span className="font-bold">18</span></p>
      </div>
    </div>
  );
};

export default FrejaID;