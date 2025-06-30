"use client";
import { QRCodeCanvas } from "qrcode.react";

export const QRPage = () => {
  return (
    <div className="flex flex-col items-center mt-20">
      <h1 className="text-2xl font-bold mb-4">Scan to Enter</h1>
      <QRCodeCanvas value="http://localhost:3000/form" size={256} />
    </div>
  );
};
