import React from "react";
import "./App.css";
import Icon from "./Icon";
import InfoBox from "./InfoBox";
import Logo from "./Logo";
import Toggle from "./Toggle";
import { VendorsList } from "./components/vendorsList";
import { SelectionList } from "./components/selectionList";
import { SummaryList } from "./components/summaryList";
import {
  GLOBAL_SCOPE,
  INTERNAL_SCOPE,
  VENDORS_SCOPE,
} from "./options.contants";

function App() {
  const toggleOptions = [
    { id: GLOBAL_SCOPE, label: "Share globally on Gustav", icon: "globe" },
    { id: VENDORS_SCOPE, label: "Select vendors", icon: "vendors" },
    { id: INTERNAL_SCOPE, label: "Internal only", icon: "internal" },
  ];

  const [scope, setScope] = React.useState("global");

  return (
    <div className="App">
      <Toggle options={toggleOptions} active={scope} onChange={setScope} />
      <div className="main-container">
        <VendorsList scope={scope} />
        <SelectionList scope={scope} />
        <SummaryList scope={scope} />
      </div>
      <br />
      <div style={{ width: "32px" }}>
        <Icon icon="clock" color="green" />
      </div>
      <br />
      <Logo name="Company" size="large" />
      <Logo name="Another company" size="small" />
      <br />
      <InfoBox
        text="Attention, attention! This is a box containing important warning"
        icon="warning"
      />
      <br />
    </div>
  );
}

export default App;
