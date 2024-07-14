// Import image
import icon from "../assets/earth-icon.svg"

// Import icon
import { FaArrowRight } from 'react-icons/fa'

// Import component
import Highscores from "./Highscores"

// Import data
import world from '../assets/countries.json'
import africa from '../assets/africa.json'
import asia from '../assets/asia.json'
import europe from '../assets/europe.json'
import northAmerica from '../assets/north-america.json'
import oceania from '../assets/oceania.json'
import southAmerica from '../assets/south-america.json'

// Create dictionary with game types
const gameTypeDict = { "world": world, "africa": africa, "asia": asia, "europe": europe, "northAmerica": northAmerica, "oceania": oceania, "southAmerica": southAmerica }

// Global variable
var sendEvent = new CustomEvent("startGame", { detail: { name: "world", list: world } })

export default function Start({ firstGame, previousGame }) {

    function createDetails(name) {
        // Create details object
        return { name: name, list: gameTypeDict[name] }
    }

    // On select change
    const handleSelectChange = (event) => {
        // Update global variable with selected game type
        sendEvent = new CustomEvent("startGame", { detail: createDetails(event.target.value) })
    };

    var titleText = "How well do you know country flags?"

    // If it's not the first game and the previous game time is valid
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