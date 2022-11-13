import { useEffect, useState } from "react";
import AreaDiagram from "./components/AreaDiagram/AreaDiagram";
import CoeffsSection from "./components/CoeffsSection/CoeffsSection";
import CriteriaSection from "./components/CriteriaSection/CriteriaSection";
import MarksSection from "./components/MarksSection/MarksSection";
import Menu from "./components/Menu/Menu";
import ProgrammingDiagram from "./components/ProgrammingDiagram/ProgrammingDiagram";
import QualitySection from "./components/QualitySection/QualitySection";
import TotalDiagram from "./components/TotalDiagram/TotalDiagram";
import UsabilityDiagram from "./components/UsabilityDiagram/UsabilityDiagram";
import UserDiagram from "./components/UserDiagram/UserDiagram";

function App() {
  const [currentSection,setCurrentSection]=useState(null);
  useEffect(()=>{
    document.addEventListener("changedSection",(e)=>{
      setCurrentSection(section[e.detail.section]);
    });
  })
  const section={
    "coeffs":<CoeffsSection/>,
    "marks":<MarksSection/>,
    "criteria": <CriteriaSection/>,
    "quality": <QualitySection/>,
    "area":<AreaDiagram/>,
    "usability":<UsabilityDiagram/>,
    "programming":<ProgrammingDiagram/>,
    "users": <UserDiagram/>,
    "total":<TotalDiagram/>
  }
  return (
    <div className="App">
      <Menu/>
      {(()=>{return currentSection})()}    </div>
  );
}

export default App;
