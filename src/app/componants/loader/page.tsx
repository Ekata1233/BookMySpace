"use client";
import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80">
      <div className="flex space-x-2">
        <span className="w-4 h-4 bg-[#6BB7BE] rounded-full animate-[extraBounce_0.6s_infinite] [animation-delay:-0.3s]"></span>
        <span className="w-4 h-4 bg-[#6BB7BE] rounded-full animate-[extraBounce_0.6s_infinite] [animation-delay:-0.15s]"></span>
        <span className="w-4 h-4 bg-[#6BB7BE] rounded-full animate-[extraBounce_0.6s_infinite]"></span>
      </div>

      <style jsx>{`
        @keyframes extraBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-16px); /* bigger bounce */
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
