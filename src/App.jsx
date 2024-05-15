
// import "./App.css";

import {useEffect, useRef, useState } from "react";
import Persons from "./components/Persons";
import Choice from "./components/Choice";
import Pvcomputer from "./components/Pvcomputer";
import Realtime from "./components/Realtime";

function App() {
  
  const [vsComp,setVsComp]= useState(true)
  const changeOpp=(z)=>{
    setVsComp(z)
  }

  return (
    <>
      <div className="text-center gap-y-4  flex flex-col justify-center items-center h-screen">
        {/* <Choice vsComp={vsComp} changeOpp={changeOpp} /> */}
        {/* {
          vsComp?<Pvcomputer />:<Persons />
        } */}
        <Realtime />
      </div>
    </>
  );
}

export default App;
