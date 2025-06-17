import React from "react";
import "./globals.css";
function Root({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default Root;
