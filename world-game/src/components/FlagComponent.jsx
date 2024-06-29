import { useState, useRef } from "react"

import { FaArrowRight } from 'react-icons/fa'

import countries from '../assets/countries.json'
import ReactCountryFlag from "react-country-flag"
import TimerComponent from "./TimerComponent"
import ScoreComponent from "./ScoreComponent"

var i = 0
var score = 0

shuffle(countries)

export default function FlagComponent() {

    const [country, setCountry] = useState({ alpha2: countries[i].alpha2, names: countries[i].names })
    const inputRef = useRef()

    function nextFlag() {
        i += 1
        setCountry({ alpha2: countries[i].alpha2, names: countries[i].names })
    }

    function checkAnswer() {
        var answer = inputRef.current.value
        if (country.names.includes(answer.toUpperCase())) {
            inputRef.current.value = ''
            score += 1
            nextFlag()
        }
    }

    return (
        <div className="flag">
            <ReactCountryFlag
                className="flag--img"
                countryCode={country.alpha2}
                svg
                style={{
                    width: "40em",
                    height: "30em"
                }}
            />
            <div className="flag--controls">
                <input className="flag--input" type="text" placeholder="Country name..." ref={inputRef} onChange={() => checkAnswer()}></input>
                <button className="flag--button" onClick={() => nextFlag()}>Skip <FaArrowRight className="flag--button-icon" /></button>
            </div>
            <div className="flag--score">
                <ScoreComponent i={i} score={score} />
                <TimerComponent />
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