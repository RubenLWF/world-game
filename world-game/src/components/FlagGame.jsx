import { useState, useRef } from "react"

import { FaArrowRight } from 'react-icons/fa'

import countries from '../assets/countries.json'
import Flag from "./Flag"
import Timer from "./Timer"
import Score from "./Score"

var flagIndex = 0
var score = 0

shuffle(countries)

export default function FlagGame() {

    const [country, setCountry] = useState({ alpha2: countries[flagIndex].alpha2, names: countries[flagIndex].names })
    const inputRef = useRef()

    function nextFlag() {
        if (flagIndex === 0) {
            window.dispatchEvent(startTimer)
        }
        flagIndex += 1
        setCountry({ alpha2: countries[flagIndex].alpha2, names: countries[flagIndex].names })
    }

    function checkAnswer() {
        var answer = inputRef.current.value
        if (country.names.includes(answer.toUpperCase())) {
            inputRef.current.value = ''
            score += 1
            nextFlag()
        }
    }

    const startTimer = new Event("startTimer")

    return (
        <div className="game">
            <Flag alpha2={country.alpha2} />
            <div className="game--controls">
                <input className="game--input" type="text" placeholder="Country name..." ref={inputRef} onChange={() => checkAnswer()}></input>
                <button className="game--button" onClick={() => nextFlag()}>Skip <FaArrowRight className="game--button-icon" /></button>
            </div>
            <div className="game--stats">
                <Score flagIndex={flagIndex} score={score} />
                <Timer />
            </div>
        </div >
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