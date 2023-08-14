import { Button } from "primereact/button";
import { AutoComplete } from "primereact/autocomplete";
import { InputSwitch } from "primereact/inputswitch";
import { useState } from "react";
import { TabPanel, TabView } from "primereact/tabview";

function App() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <div className="container p-0">
        <div className="row align-items-center w-100 m-0">
          <div className="col-md-2">
            <Button type="button" className="h-40 mx-3" rounded>
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
            <AutoComplete className="rounded-4"></AutoComplete>
          </div>
          <div className="col-md-2">
            <InputSwitch
              className="mx-3"
              checked={checked}
              onChange={(e) => setChecked(e.value)}
            />
          </div>
          <div className="col-md-2">
            <TabView>
              <TabPanel header="Tražim">
                <h1>Content I</h1>
              </TabPanel>
              <TabPanel header="Nudim">
                <h1>Content II</h1>
              </TabPanel>
            </TabView>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
