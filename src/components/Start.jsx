import icon from "../assets/earth-icon.svg"

import { FaArrowRight } from 'react-icons/fa'

import Highscores from "./Highscores"

export default function Start() {
    return (
        <div className="start">
            <div className="start-screen">
                <img src={icon} alt="Globe" className="start-screen--image"></img>
                <h1 className="start-screen--title">How well do you know country flags?</h1>
                <button className="start-screen--button" onClick={() => window.dispatchEvent(new Event("startGame"))}>Press this button to find out <FaArrowRight className="button-icon" /></button>
            </div>
            <Highscores />
        </div>
    )
}