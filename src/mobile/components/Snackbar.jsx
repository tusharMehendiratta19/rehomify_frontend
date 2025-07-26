// components/Snackbar.js
import React, { useEffect, useState } from "react";
import "../allStyles/snackbar.css";

const Snackbar = () => {
  const [snack, setSnack] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      setSnack(e.detail);
      setTimeout(() => setSnack(null), 3000); // Hide after 3s
    };

    window.addEventListener("snackbar", handler);
    return () => window.removeEventListener("snackbar", handler);
  }, []);

  if (!snack) return null;

  return (
    <div className={`snackbar ${snack.type}`}>
      {snack.message}
    </div>
  );
};

export default Snackbar;
