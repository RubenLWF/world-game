import { useState } from "react";

import countries from '../assets/countries.json'
import ReactCountryFlag from "react-country-flag";

var i = 0

shuffle(countries);

export default function FlagComponent() {

    const [Country, setCountry] = useState({ alpha2: countries[i].alpha2, name: countries[i].name })

    function nextFlag() {
        i += 1
        setCountry({alpha2: countries[i].alpha2, name: countries[i].name})
    }

    return (
        <>
            <ReactCountryFlag
                countryCode={Country.alpha2}
                svg
                style={{
                    width: "40em",
                    height: "30em"
                }}
            />
            <h1>{Country.name}</h1>
            <button onClick={() => nextFlag()}>Next</button>
        </>
    )
}

function shuffle(array) {
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