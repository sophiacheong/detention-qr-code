"use client";
import { QRCodeCanvas } from "qrcode.react";
import { useEffect, useState } from "react";

export const QRPage = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(`${window.location.origin}`);
    }
  }, []);

  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-4">Scan to Enter</h1>
      <QRCodeCanvas value={`${url}/form`} size={256} />
    </div>
  );
};
