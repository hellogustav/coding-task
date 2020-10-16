import React from "react";
import PropTypes from "prop-types";
import InfoBox from "../InfoBox";

export function InfoContainer({ title, description }) {
  return (
    <div className="info-container">
      <h3 className="title">{title}</h3>
      <InfoBox text={description} icon="warning" />
    </div>
  );
}

InfoContainer.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
