import React from "react";

import Icon from "./Icon";

function InfoBox({ icon, text }) {
  return (
    <div className="InfoBox">
      <div className="InfoBox-icon">
        <Icon icon={icon} color="#0b748c" />
      </div>
      {text}
    </div>
  );
}

export default InfoBox;
