import { Button } from "primereact/button";
import { InputSwitch } from "primereact/inputswitch";
import { useEffect, useRef, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import {
  animateElement,
  animateElementWithAllChildren,
} from "./helpers/animate-element/animate-element.helper.js";

function App() {
  const [checked, setChecked] = useState(false);
  const parentRef = useRef(null);
  const dropdownRef = useRef(null);
  const LENGTH = 10;
  const [values, setValues] = useState([]);
  useEffect(() => {
    animateElement(parentRef);
  }, [parentRef]);
  useEffect(() => {
    animateElementWithAllChildren(dropdownRef, "fade");
  }, [dropdownRef]);

  useEffect(() => {
    generateValues(LENGTH);
  }, []);

  useEffect(() => {
    console.log("values", values);
  }, [values]);

  const generateValues = async (length) => {
    for (let i = 0; i < length; i++) {
      addValue();
      await delay(375);
    }
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const addValue = () => {
    setValues((prev) => {
      return [...prev, "new value"];
    });
  };

  return (
    <>
      <div className="container p-0" ref={parentRef}>
        {values.map((value, index) => {
          return <div key={index}>{value}</div>;
        })}
        <div className="row align-items-center w-100 m-0">
          <div className="col-md-2">
            <Button
              onClick={addValue}
              type="button"
              className="h-40 mx-3"
              rounded
            >
              Tražim
            </Button>
          </div>
          <div className="col-md-2">
            <Button
              type="button"
              severity="secondary"
              className="h-40 mx-3"
              rounded
            >
              Tražim
            </Button>
          </div>
          <div className="col-md-2">
            <InputSwitch
              className="mx-3"
              checked={checked}
              onChange={(e) => setChecked(e.value)}
            />
          </div>
          <div className="col-md-2" ref={dropdownRef}>
            <TabView>
              <TabPanel header="Tražim">
                <div key="1">
                  <h1>Content I</h1>
                </div>
              </TabPanel>
              <TabPanel header="Nudim">
                <div key="2">
                  <h1>Content II</h1>
                  <div>asdasd</div>
                </div>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
