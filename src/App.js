import React, { useState } from 'react'
import FeatureBox from './Component/smallerComp/FeatureBox'
import Header from './Component/smallerComp/Header'
import SmartBoard from './Component/smallerComp/SmartBoard'

export default function App() {


  const [mode, setmode] = useState({ mode: "noraml" })
  const [buttonClick, setbuttonClick] = useState({})
  const [pagestate, setpagestate] = useState({unco: false , redo: false})

  return (
    <>
      <Header  buttonOption={{pagestate , setpagestate}}/>
      {/* <Toolbar /> */}
      <FeatureBox mode={mode} setmode={setmode}  buttonOption={{pagestate , setpagestate}} />
      <SmartBoard mode={mode} setmode={setmode}  buttonOption={{pagestate , setpagestate}} />

      {/* <Board /> */}
    </>
  )
}
