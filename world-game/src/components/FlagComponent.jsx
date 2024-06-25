import { useState } from "react";

import { FaArrowRight } from 'react-icons/fa';

import countries from '../assets/countries.json'
import ReactCountryFlag from "react-country-flag";

var i = 0
var score = 0;

Shuffle(countries);

export default function FlagComponent() {

    const [Country, setCountry] = useState({ alpha2: countries[i].alpha2, name: countries[i].name })

    function nextFlag() {
        i += 1
        setCountry({ alpha2: countries[i].alpha2, name: countries[i].name })
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
                <input className="flag--input" type="text"></input>
                <button className="flag--button" onClick={() => nextFlag()}><FaArrowRight /></button>
            </div>

            <div className="flag--score">
                <p>{score} / {i + 1} ({(100 / (i + 1)) * score}%)</p>
            </div>
        </div>
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