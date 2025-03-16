"use client";

import React, { useState, useEffect, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { ISourceOptions } from "tsparticles-engine";

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

  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions: ISourceOptions = {
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
        direction: "none",
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
      <div className="w-[99%] max-w-[380px] h-[880px] bg-gradient-to-t from-blue-600 to-blue-900 rounded-[40px] shadow-xl text-white flex flex-col items-center p-6 relative overflow-hidden z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={particlesOptions}
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: -1 }}
        />
        <div className="absolute top-4 w-28 h-6 bg-black rounded-full"></div>

        {/* Navbar med symboler och titel */}
        <div className="absolute top-[80px] flex justify-between items-center w-[90%]">
          <div className="cursor-pointer">
            <ChevronLeft size={24} strokeWidth={2} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold">FREJA+</h2>
          <div className="cursor-pointer flex items-center justify-center w-6 h-6 border border-white rounded-full">
            <MoreHorizontal size={16} strokeWidth={2} className="text-white" />
          </div>
        </div>

        {/* Profilbild */}
        <div className="mt-24 w-[32vw] h-[32vw] max-w-48 max-h-48 rounded-full border-4 border-[#80cfff] overflow-hidden flex justify-center items-center">
          <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>

        <p className="text-base mt-6 w-[90%] text-center">Giltigt t o m: <span className="font-bold">2024-07-21</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Efternamn: <span className="font-bold">Bengtsson</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Namn: <span className="font-bold">Emil</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Ålder: <span className="font-bold">18</span></p>

        <div className="bg-indigo-900 p-4 mt-6 rounded-lg w-[99.5%] text-center flex flex-col items-center relative z-10">
          <div className="grid grid-cols-3 w-full text-sm px-6">
            <p className="text-left -ml-6">Tid</p>
            <p className="text-left -ml-4">Datum</p>
            <p className="text-left">Giltig i</p>
          </div>
          <div className="grid grid-cols-3 w-full text-lg mt-1 px-6">
            <p className="font-bold text-left -ml-6">{formatTime(currentTime)}</p>
            <p className="font-bold text-left -ml-4">{formatDate(currentTime)}</p>
            <p className="font-bold text-left">{validityTime} sek</p>
          </div>

          <div className="bg-white p-3 mt-2 rounded-lg w-[99.5%] text-center text-black">
            <div className="mt-2 flex justify-center">
              <QRCodeSVG value="https://kontroll.frejaeid.com" size={120} fgColor="#1e3a8a" />
            </div>
            <p className="text-sm mt-2 text-[#1e3a8a]">Personnummer: <span className="font-bold text-[#1e3a8a]">060317-3613</span></p>
          </div>

          <p className="text-sm mt-2 text-white">Kolla ID på: kontroll.frejaeid.com</p>
        </div>
      </div>
    </div>
  );
};

export default FrejaID;