import React from "react";
import "./globals.css";
function Root({ children }) {
  return (
    <html lang="en" className="">
      <body className="bg-black">{children}</body>
    </html>
  );
}

export default Root;
