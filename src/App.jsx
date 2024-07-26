
// import "./App.css";

import {useEffect, useRef, useState } from "react";
import Persons from "./components/Persons";
import Choice from "./components/Choice";
import Pvcomputer from "./components/Pvcomputer";
import Realtime from "./components/Realtime";

function App() {
  // -------> for online
  // if one person is finding a match diable his play button.
  // fix play again after one online match
  const [vsComp,setVsComp]= useState(1)
  const changeOpp=(z)=>{
    setVsComp(z)
  }

  return (
    <>
      <div className="text-center gap-y-4  flex flex-col justify-center items-center h-screen">
        <Choice vsComp={vsComp} changeOpp={changeOpp} />
        {
          vsComp===1?<Pvcomputer />:vsComp===2?<Persons />:<Realtime />
        }
        
      </div>
    </>
  );
}

export default App;
