import React from "react";

import ToggleOption from "./ToggleOption";

function Toggle({ options = [], active, onChange }) {
  return (
    <div className="Toggle">
      {options.map((option) => (
        <ToggleOption
          key={option.id}
          option={option}
          active={active}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

export default Toggle;
