import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const FrejaID = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [validityTime, setValidityTime] = useState(120);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      setValidityTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("sv-SE", { day: "2-digit", month: "short" });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="w-[99%] max-w-[380px] h-[844px] bg-gradient-to-t from-blue-600 to-blue-900 rounded-[40px] shadow-xl text-white flex flex-col items-center p-6 relative overflow-hidden" style={{ fontFamily: "Arial, sans-serif" }}>
        <Particles
          id="particles"
          options={{
            particles: {
              number: { value: 50 },
              size: { value: 3 },
              move: { enable: true, speed: 1 },
              opacity: { value: 0.5 },
              color: { value: "#ffffff" },
            },
            interactivity: {
              events: { onHover: { enable: false } },
            },
          }}
        />
        <div className="absolute top-4 w-28 h-6 bg-black rounded-full"></div>
        
        <div className="absolute top-6 left-6 cursor-pointer">
          <ChevronLeft size={26} strokeWidth={2} className="rounded-full" />
        </div>
        
        <div className="absolute top-6 right-6 cursor-pointer flex items-center justify-center w-6 h-6 border border-white rounded-full">
          <MoreHorizontal size={16} strokeWidth={2} />
        </div>
        
        <h2 className="text-3xl font-bold mt-10">FREJA+</h2>
        <div className="w-[32vw] h-[32vw] max-w-48 max-h-48 rounded-full border-4 border-white overflow-hidden mt-4 flex justify-center items-center">
          <img src="/profile.jpg" alt="Profile" className="w-full h-full object-cover rounded-full" />
        </div>
        <p className="text-base mt-4 w-[90%] text-center">Giltigt t o m: <span className="font-bold">2024-07-21</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Efternamn: <span className="font-bold">Andersson</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Namn: <span className="font-bold">Anna Marielle Sara</span></p>
        <p className="text-base mt-4 w-[90%] text-center">Ålder: <span className="font-bold">26</span></p>
        
        <div className="bg-indigo-900 p-4 mt-6 rounded-lg w-[99.5%] text-center flex flex-col items-center relative z-10">
          <div className="flex justify-between w-full text-sm px-4">
            <p className="w-1/3 text-left pr-10">Tid</p>
            <p className="w-1/3 text-left">Datum</p>
            <p className="w-1/3 text-left">Giltig i</p>
          </div>
          <div className="flex justify-between w-full text-lg mt-0.5 px-4">
            <p className="w-1/3 font-bold text-left">{formatTime(currentTime)}</p>
            <p className="w-1/3 font-bold text-left">{formatDate(currentTime)}</p>
            <p className="w-1/3 font-bold text-left">{validityTime} sek</p>
          </div>
          
          <div className="bg-white p-3 mt-2 rounded-lg w-[99.5%] text-center text-black">
            <div className="mt-2 flex justify-center">
              <QRCodeSVG value="https://kontroll.frejaeid.com" size={120} fgColor="#1e3a8a" />
            </div>
            <p className="text-sm mt-2 text-[#1e3a8a]">Personnummer: <span className="font-bold text-[#1e3a8a]">970631-4628</span></p>
          </div>
          
          <p className="text-sm mt-2 text-white">Kolla ID på: kontroll.frejaeid.com</p>
        </div>
      </div>
    </div>
  );
};

export default FrejaID;