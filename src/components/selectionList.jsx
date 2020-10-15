import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";
import {
  GLOBAL_SCOPE,
  INTERNAL_SCOPE,
  VENDORS_SCOPE,
} from "../options.contants";
import { SectionHeader } from "./sectionHeader";
import { InfoContainer } from "./infoContainer";

const titles = {
  [INTERNAL_SCOPE]: "Internal",
  [VENDORS_SCOPE]: "All vendor partners",
  [GLOBAL_SCOPE]: "Global",
};

export function SelectionList({ scope, state }) {
  const title = titles[scope];

  return (
    <div className="selection-list">
      <SectionHeader icon="vendors">{title}</SectionHeader>
      {scope === GLOBAL_SCOPE && (
        <InfoContainer
          title="Share job globally"
          description="The job will be shared globally. All vendors on Gustav will be able to see the job and submit candidates to it. Global jobs are reviewed by the Gustav team. This may take up to 24 hours."
        />
      )}
      {scope === INTERNAL_SCOPE && (
        <InfoContainer
          title="Share job internally"
          description="The job will only be visible to your internal team. You can share it to vendors or globally after it was published."
        />
      )}
      {JSON.stringify(state, null, 4)}
    </div>
  );
}

SelectionList.propTypes = {
  scope: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  state: PropTypes.object.isRequired,
};
