import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";
import {
  animateElement,
  animateElementWithAllChildren,
} from "./helpers/animate-element/animate-element.helper.js";

function App() {
  const FADE_DURATION = 300;
  const SCALE_DURATION = 120;
  const [checked, setChecked] = useState(false);
  const parentRef = useRef(null);
  const dropdownRef = useRef(null);
  const LENGTH = 10;
  const [values, setValues] = useState([]);
  useEffect(() => {
    animateElement(parentRef, "scale", SCALE_DURATION);
  }, [parentRef]);
  useEffect(() => {
    animateElementWithAllChildren(dropdownRef, "fade", FADE_DURATION);
  }, [dropdownRef]);

  useEffect(() => {
    generateValues(LENGTH);
  }, []);

  const generateValues = async (length) => {
    for (let i = 0; i < length; i++) {
      addValue();
      await delay(SCALE_DURATION - SCALE_DURATION * 0.0);
    }
  };

  const resetValues = () => {
    setValues([]);
  };
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const addValue = () => {
    setValues((prev) => {
      return [...prev, "new value " + prev.length];
    });
  };

  return (
    <>
      <div className="container p-4">
        <div className="row gap-2 justify-content-start" ref={parentRef}>
          {values.map((value, index) => {
            return (
              <div className="col-5 col-md-1 p-3" key={index}>
                {value}
              </div>
            );
          })}
        </div>
        <div className="row align-items-center w-100 m-0">
          <div className="col-md-4 fixed-bottom mb-2">
            <Button
              onClick={() => generateValues(5)}
              type="button"
              className="h-40 mx-3 "
              rounded
            >
              Add
            </Button>
            <Button
              onClick={resetValues}
              type="button"
              severity="secondary"
              className="h-40 mx-3"
              rounded
            >
              Reset
            </Button>
          </div>
          <div
            className="col-md-2 position-fixed top-10 p-2 right-10 shadow-lg rounded-4 bg-white transition-all-auto min-width min-h-200"
            ref={dropdownRef}
          >
            <TabView>
              <TabPanel header="Tražim">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h1>Content I</h1>
                </div>
              </TabPanel>
              <TabPanel header="Nudim">
                <div className="d-flex flex-column justify-content-center align-items-center">
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
