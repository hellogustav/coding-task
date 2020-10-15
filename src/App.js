import React, {useEffect, useState} from "react";
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
import axios from "axios";

function App() {
  const toggleOptions = [
    { id: GLOBAL_SCOPE, label: "Share globally on Gustav", icon: "globe" },
    { id: VENDORS_SCOPE, label: "Select vendors", icon: "vendors" },
    { id: INTERNAL_SCOPE, label: "Internal only", icon: "internal" },
  ];

  const [scope, setScope] = React.useState("global");
  const [data, setData] = useState({ vendors: [], circles: [] });
  const [state, setState] = useState({ allVendorsButtonSelected: false, circleButtonSelection: '', vendorsSelected: [] });

  useEffect(() => {
    const fetchData = async () => {
      const vendorResponse = await axios(
        'https://mock.hellogustav.com/vendors',
      );
      const circleResponse = await axios(
        'https://mock.hellogustav.com/circles',
      );

      const vendors = vendorResponse.data.vendors
      const circles = circleResponse.data.circles.map((circle) => ({ ...circle, vendorItems: circle.vendors.map((vendorId) => vendors.find(vendor => vendor.id === vendorId))}))
      setData({ ...data, vendors, circles, });
    }
    fetchData();
  }, []);

  return (
    <div className="App">
      <Toggle options={toggleOptions} active={scope} onChange={setScope} />
      <div className="main-container">
        <VendorsList scope={scope} circles={data.circles} vendors={data.vendors} setState={setState} state={state} />
        <SelectionList scope={scope} setState={setState} state={state} circles={data.circles} vendors={data.vendors} />
        <SummaryList scope={scope} setState={setState} state={state} circles={data.circles} vendors={data.vendors} />
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
