import icon from "../assets/earth-icon.svg"

import { FaArrowRight } from 'react-icons/fa'

export default function Start() {
    return  (
        <div className="start">
            <img src={icon} alt="Globa" className="start--image"></img>
            <h1 className="start--title">How well do you know country flags?</h1>
            <button className="start--button" onClick={() => window.dispatchEvent(new Event("startGame"))}>Press this button to find out <FaArrowRight className="button-icon"/></button>
        </div>
    )
}