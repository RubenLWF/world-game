// Import React hooks
import { useState, useRef, useEffect } from "react"

// Import icons
import { FaArrowRight } from 'react-icons/fa'

// Import components
import Start from "./Start"
import Flag from "./Flag"
import Timer from "./Timer"
import Score from "./Score"
import Highscores from "./Highscores"

// Global variables
var flagIndex = 0
var score = 0
var started = false
var firstGame = true
var oldTime = null
var oldScore = 0
var gameType = "world"
var countries = [{ alpha2: "nl", names: ["THE NETHERLANDS"] }]

export default function FlagGame() {

    const [country, setCountry] = useState({ alpha2: countries[flagIndex].alpha2, names: countries[flagIndex].names })
    const [gameTime, setGameTime] = useState(null)
    const inputRef = useRef()

    useEffect(() => {
        // Listen for startGame event
        window.addEventListener("startGame", event => {
            // Get data from event details
            gameType = event.detail.name
            countries = event.detail.list

            // Shuffle countries
            shuffle(countries)

            // Set started to true and move to first flag
            started = true
            nextFlag(true)
        })
    }, [])

    useEffect(() => {
        // Save score to local storage
        if (gameTime != null) {
            // Get name of local storage item
            const scoreName = gameType + '_scores'

            // Get scores from local storage
            var scores = localStorage.getItem(scoreName) ? JSON.parse(localStorage.getItem(scoreName)) : []

            // Add new score to list
            scores.push({ score: score, total: countries.length, time: gameTime, date: new Date() })

            // Sort scores by score and time
            scores.sort((a, b) => b.score - a.score || (a.time.sec + a.time.min * 60 + a.time.hr * 60 * 60) - (b.time.sec + b.time.min * 60 + b.time.hr * 60 * 60))

            // Keep only top 10 scores
            if (scores.length > 10) {
                scores.pop()
            }

            // Save scores to local storage
            localStorage.setItem(scoreName, JSON.stringify(scores))

            // Save old score and time
            oldTime = gameTime
            oldScore = score

            // Reset score and time
            setGameTime(null)
            score = 0
        }
    }, [gameTime]);

    function nextFlag(first = false) {
        // Increase flag index if not first flag
        if (!first) flagIndex += 1

        // If at last flag
        if (flagIndex >= countries.length) {
            // Send event to stop timer
            window.dispatchEvent(new Event("stopTimer"))

            // Reset game
            flagIndex = 0
            started = false
            firstGame = false

            return
        }

        // Set flag to next in list
        setCountry({ alpha2: countries[flagIndex].alpha2, names: countries[flagIndex].names })
    }

    function checkAnswer() {
        // Get input value
        var answer = inputRef.current.value

        // If input country is equal to one of the allowed country names
        if (country.names.includes(answer.toUpperCase())) {
            // Clear input and increase score
            inputRef.current.value = ''
            score += 1

            // Move to next flag
            nextFlag()
        }
    }

    // If the start button has not been pressed
    if (!started) {
        return (<Start firstGame={firstGame} previousGame={ {score: oldScore, time: oldTime, listSize: countries.length}}/>)
    }

    return (
        <>
            <div className="game">
                <Flag alpha2={country.alpha2} />
                <div className="game--controls">
                    <input className="game--input" type="text" placeholder="Country name..." ref={inputRef} onChange={() => checkAnswer()}></input>
                    <button className="game--button" onClick={() => nextFlag()}>Skip <FaArrowRight className="button-icon" /></button>
                </div>
                <div className="game--stats">
                    <Score flagIndex={flagIndex} score={score} />
                    <Timer sendTime={setGameTime} />
                </div>
            </div >
            <Highscores />
        </>
    )
}

function shuffle(array) {
    let currentIndex = array.length

    while (currentIndex != 0) {
        let randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }
}