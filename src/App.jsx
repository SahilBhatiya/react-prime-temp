import { Button } from "primereact/button";
import { useEffect, useRef, useState } from "react";
import { animateElementWithAllChildren } from "./helpers/animate-element/animate-element.helper.js";

import { Card } from "primereact/card";
import { Carousel } from "primereact/carousel";

function App() {
  const FADE_DURATION = 300;
  const SCALE_DURATION = 120;
  const parentRef = useRef(null);
  const dropdownRef = useRef(null);
  const LENGTH = 10;
  const [values, setValues] = useState([]);
  const [page, setPage] = useState(0);
  useEffect(() => {
    animateElementWithAllChildren(parentRef, "scale", SCALE_DURATION);
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

  const changePage = () => {
    setPage((prev) => prev + 1);
  };

  const resetPage = () => {
    setPage(0);
  };

  const cardTemplate = (value) => {
    return <Card className="w-180 h-320">{value}</Card>;
  };

  return (
    <>
      <div className="container p-4">
        <div className="row" ref={parentRef}>
          <Carousel
            value={values}
            numScroll={1}
            page={page}
            numVisible={7}
            itemTemplate={cardTemplate}
            showIndicators={false}
            showNavigators={true}
            containerClassName="home__screen__cards"
          />
        </div>
        <div className="row align-items-center w-100 m-0">
          <div className="col-md-4 fixed-bottom mb-2">
            <Button
              onClick={() => changePage()}
              type="button"
              className="h-40 mx-3 "
              rounded
            >
              Next
            </Button>
            <Button
              onClick={resetPage}
              type="button"
              severity="secondary"
              className="h-40 mx-3"
              rounded
            >
              Reset
            </Button>
          </div>
          {/*<div*/}
          {/*  className="col-md-2 p-2  shadow-lg rounded-4 bg-white transition-all-auto min-width min-h-200"*/}
          {/*  ref={dropdownRef}*/}
          {/*>*/}
          {/*  <TabView>*/}
          {/*    <TabPanel header="Tražim">*/}
          {/*      <div className="d-flex flex-column justify-content-center align-items-center">*/}
          {/*        <h1>Content I</h1>*/}
          {/*      </div>*/}
          {/*    </TabPanel>*/}
          {/*    <TabPanel header="Nudim">*/}
          {/*      <div className="d-flex flex-column justify-content-center align-items-center">*/}
          {/*        <h1>Content II</h1>*/}
          {/*        <div>asdasd</div>*/}
          {/*      </div>*/}
          {/*    </TabPanel>*/}
          {/*  </TabView>*/}
          {/*</div>*/}
        </div>
      </div>
    </>
  );
}

export default App;
