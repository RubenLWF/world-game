import { useState, useRef, useEffect } from "react"

import { FaArrowRight } from 'react-icons/fa'

import world from '../assets/countries.json'
import Start from "./Start"
import Flag from "./Flag"
import Timer from "./Timer"
import Score from "./Score"
import Highscores from "./Highscores"

var flagIndex = 0
var score = 0
var started = false
var firstGame = true
var oldTime = null
var oldScore = 0
var gameType = "world"
var countries = world

export default function FlagGame() {

    const [country, setCountry] = useState({ alpha2: countries[flagIndex].alpha2, names: countries[flagIndex].names })
    const [gameTime, setGameTime] = useState(null)
    const inputRef = useRef()

    useEffect(() => {
        // Listen for startGame event
        window.addEventListener("startGame", event => {
            // Set started to true and move to first flag
            gameType = event.detail.name
            countries = event.detail.list
            shuffle(countries)
            started = true
            nextFlag(true)
        })
    }, [])

    useEffect(() => {
        // Save score to local storage
        if (gameTime != null) {
            const scoreName = gameType + '_scores'
            var scores = localStorage.getItem(scoreName) ? JSON.parse(localStorage.getItem(scoreName)) : []

            scores.push({ score: score, total: countries.length, time: gameTime, date: new Date() })

            scores.sort((a, b) => b.score - a.score || (a.time.sec + a.time.min * 60 + a.time.hr * 60 * 60) - (b.time.sec + b.time.min * 60 + b.time.hr * 60 * 60))

            if (scores.length > 10) {
                scores.pop()
            }

            oldTime = gameTime
            oldScore = score
            setGameTime(null)
            score = 0

            localStorage.setItem(scoreName, JSON.stringify(scores))
        }
    }, [gameTime]);

    // Get time from timer component
    function getTime(time) {
        setGameTime(time)
    }

    function nextFlag(first = false) {
        if (!first) flagIndex += 1

        // If at last flag
        if (flagIndex >= countries.length) {
            // Send event to stop timer
            window.dispatchEvent(new Event("stopTimer"))

            // Re-shuffle countries
            shuffle(countries)

            // Reset game
            flagIndex = 0
            started = false
            firstGame = false

            // Set flag to first in list
            setCountry({ alpha2: countries[flagIndex].alpha2, names: countries[flagIndex].names })

            return
        }

        // Set flag to next in list
        setCountry({ alpha2: countries[flagIndex].alpha2, names: countries[flagIndex].names })
    }

    function checkAnswer() {
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
                    <Timer sendTime={getTime} />
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