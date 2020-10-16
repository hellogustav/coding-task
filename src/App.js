import React, {useCallback, useEffect, useState} from "react";
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
import {fetchData, sendData} from "./services/api";

function App() {
  const toggleOptions = [
    { id: GLOBAL_SCOPE, label: "Share globally on Gustav", icon: "globe" },
    { id: VENDORS_SCOPE, label: "Select vendors", icon: "vendors" },
    { id: INTERNAL_SCOPE, label: "Internal only", icon: "internal" },
  ];

  const [scope, setScope] = React.useState("global");
  const [data, setData] = useState({ vendors: [], circles: [], apiCallStatus: '', isSending: false });
  const [state, setState] = useState({
    allVendorsButtonSelected: false,
    circleButtonSelection: "",
    vendorsSelected: [],
    selectedCircles: [],
    selectedVendorIds: [],
  });

  useEffect(() => {
    fetchData(setData);
  }, []);

  const publish = useCallback(async () => {
    if (data.isSending) return;

    setData({...data, isSending: true })
    try {
      await sendData(state, scope);
      setData({...data, isSending: false, apiCallStatus: 'success' })
    } catch (e) {
      setData({...data, isSending: false, apiCallStatus: e })
    }
  }, [data, state, scope])

  return (
    <div className="App">
      <Toggle options={toggleOptions} active={scope} onChange={setScope} />
      <div className="main-container">
        <VendorsList
          scope={scope}
          circles={data.circles}
          vendors={data.vendors}
          setState={setState}
          state={state}
        />
        <SelectionList
          scope={scope}
          setState={setState}
          state={state}
          circles={data.circles}
          vendors={data.vendors}
        />
        <SummaryList
          scope={scope}
          setState={setState}
          state={state}
          circles={data.circles}
          vendors={data.vendors}
        />
      </div>
      <div className="button-container">
        <button disabled={data.isSending} type="button" onClick={publish}>Publish</button>
      </div>

      {data.apiCallStatus && <InfoBox text={data.apiCallStatus === 'success' ? 'Api call returned 200 success' : `Api call returned error: ${data.apiCallStatus}`} icon="warning" />}
    </div>
  );
}

export default App;
