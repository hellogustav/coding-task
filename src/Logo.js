import React from "react";

function Logo({ name, size = "large" }) {
  const logoColors = [
    "#0B748C",
    "#0AAFC4",
    "#FF7656",
    "#FBAC9E",
    "#00A878",
    "#FABC3C",
    "#C391B9",
    "#8779B3",
    "#5A6EAE",
  ];

  const colorIndex = name.charCodeAt(0) % logoColors.length;
  const backgroundColor = logoColors[colorIndex];

  return (
    <div className={`Logo Logo--${size}`} style={{ backgroundColor }}>
      {name[0]}
    </div>
  );
}

export default Logo;
