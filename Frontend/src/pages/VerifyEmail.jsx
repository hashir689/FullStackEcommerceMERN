import React, { useState } from "react";
import { useParams } from "react-router-dom";

const VerifyEmail = () => {
  const token = useParams();
  const [status, setstatus] = useState("Verifying...");
  return (
    <div className="relative w-full h-[760px] bg-pink-100 overflow-hidden">
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-2xl shadow-md text-center w-[90%] max-w-md">
          <h2 className="text-xl font-semibold text-gray-800">{status}</h2>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
