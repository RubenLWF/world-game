import icon from "../assets/earth-icon.svg"

import { FaArrowRight } from 'react-icons/fa'

import Highscores from "./Highscores"

import world from '../assets/countries.json'
import africa from '../assets/africa.json'
import asia from '../assets/asia.json'
import europe from '../assets/europe.json'
import northAmerica from '../assets/north-america.json'
import oceania from '../assets/oceania.json'
import southAmerica from '../assets/south-america.json'

var sendEvent = new CustomEvent("startGame", { detail: { name: "world", list: world } })

export default function Start( { firstGame, previousGame}) {
    const handleSelectChange = (event) => {
        switch (event.target.value) {
            case "world":
                sendEvent = new CustomEvent("startGame", { detail: { name: "world", list: world } })
                break
            case "africa":
                sendEvent = new CustomEvent("startGame", { detail: { name: "africa", list: africa } })
                break
            case "asia":
                sendEvent = new CustomEvent("startGame", { detail: { name: "asia", list: asia } })
                break
            case "europe":
                sendEvent = new CustomEvent("startGame", { detail: { name: "europe", list: europe } })
                break
            case "northAmerica":
                sendEvent = new CustomEvent("startGame", { detail: { name: "northAmerica", list: northAmerica } })
                break
            case "oceania":
                sendEvent = new CustomEvent("startGame", { detail: { name: "oceania", list: oceania } })
                break
            case "southAmerica":
                sendEvent = new CustomEvent("startGame", { detail: { name: "southAmerica", list: southAmerica } })
                break
            default:
                sendEvent = new CustomEvent("startGame", { detail: { name: "world", list: world } })
        }
    };

    var titleText = "How well do you know country flags?"

    if (!firstGame && previousGame.time != null) {
        titleText = "You just scored " + previousGame.score + "/" + previousGame.listSize + " in " + String(previousGame.time.min).padStart(2, '0') + ":" + String(previousGame.time.sec).padStart(2, '0')
    }

    return (
        <div className="start">
            <div className="start-screen">
                <img src={icon} alt="Globe" className="start-screen--image"></img>
                <h1 className="start-screen--title">{titleText}</h1>
                <div className="start-screen--buttons">
                    <select className="start-screen--dropdown" onChange={handleSelectChange}>
                        <option value="world">World</option>
                        <option value="africa">Africa</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="northAmerica">North America</option>
                        <option value="oceania">Oceania</option>
                        <option value="southAmerica">South America</option>
                    </select>
                    <button className="start-screen--button" onClick={() => window.dispatchEvent(sendEvent)}>Start <FaArrowRight className="button-icon" /></button>
                </div>
            </div>
            <Highscores />
        </div>
    )
}