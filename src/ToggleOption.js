import React from "react";

import Icon from "./Icon";

function ToggleOption({ option, active, onChange }) {
  const { id, label, icon } = option;

  const isActive = active === id;

  return (
    <button
      className={`ToggleOption ${isActive ? "ToggleOption--active" : ""}`}
      onClick={() => onChange(id)}
    >
      <div className="ToggleOption-icon">
        <Icon icon={icon} color={isActive ? "white" : "#bac2cb"} />
      </div>
      {label}
    </button>
  );
}

export default ToggleOption;
