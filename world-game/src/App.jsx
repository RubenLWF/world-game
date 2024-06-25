import { useState } from 'react'
import './App.css'
import FlagComponent from './components/FlagComponent';

export default function App() {

  const poop = () => {
    console.log("Great Shot!");
  }


  return (
    <>
      <FlagComponent />
      <input type='text'></input>
      <button onClick={poop}>
        Test
      </button>
    </>
  )
}

function SetFlag() {

}