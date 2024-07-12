import icon from "../assets/earth-icon.svg"

import { FaArrowRight } from 'react-icons/fa'

import Highscores from "./Highscores"

export default function Restart({ score, time, listSize }) {
    if (time != null) {
        return (
            <div className="start">
                <div className="start-screen">
                    <img src={icon} alt="Globe" className="start-screen--image"></img>
                    <h1 className="start-screen--title">You just scored {score}/{listSize} in {String(time.min).padStart(2, '0')}:{String(time.sec).padStart(2, '0')}</h1>
                    <button className="start-screen--button" onClick={() => window.dispatchEvent(new Event("startGame"))}>Try again... <FaArrowRight className="button-icon" /></button>
                </div>
                <Highscores />
            </div>
        )
    }
}