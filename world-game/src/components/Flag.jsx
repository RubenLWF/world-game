import ReactCountryFlag from "react-country-flag"

export default function Flag({alpha2}) {
    return  <ReactCountryFlag
    className="game--flag"
    countryCode={alpha2}
    svg
    style={{
        width: "40em",
        height: "30em"
    }}
/>
}