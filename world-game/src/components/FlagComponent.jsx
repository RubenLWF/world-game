import { useState, useRef } from "react";

import { FaArrowRight } from 'react-icons/fa';

import countries from '../assets/countries.json'
import ReactCountryFlag from "react-country-flag";

var i = 0
var score = 0;

Shuffle(countries);

export default function FlagComponent() {

    const [Country, setCountry] = useState({ alpha2: countries[i].alpha2, names: countries[i].names })
    const inputRef = useRef();

    function NextFlag() {
        i += 1
        setCountry({ alpha2: countries[i].alpha2, names: countries[i].names })
    }

    function CheckAnswer() {
        var answer = inputRef.current.value
        if (Country.names.includes(answer.toUpperCase())) {
            inputRef.current.value = ''
            score += 1
            NextFlag()
        }
    }

    function GetScore() {

        if (i > 0) {
            return (<p>{score} / {i} ({Math.round((100 / (i)) * score)}%)</p>)
        }

        return (<p>Your score will be displayed here...</p>)
    }

    return (
        <div className="flag">
            <ReactCountryFlag
                className="flag--img"
                countryCode={Country.alpha2}
                svg
                style={{
                    width: "40em",
                    height: "30em"
                }}
            />
            <div className="flag--controls">
                <input className="flag--input" type="text" placeholder="Country name..." ref={inputRef} onChange={() => CheckAnswer()}></input>
                <button className="flag--button" onClick={() => NextFlag()}>Skip <FaArrowRight className="flag--button-icon" /></button>
            </div>
            <div className="flag--score">
                <GetScore />
            </div>
        </div >
    )
}

function Shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}