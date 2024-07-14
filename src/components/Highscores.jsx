// Import React hooks
import { useState } from "react"

// Import icons
import { FaStar } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa'

// Global variables
var scoreName = "world_scores"

export default function Highscores() {

    const [scores, setScores] = useState(getScores())

    // On select change
    const handleSelectChange = (event) => {
        // Update highscores to selected list
        scoreName = event.target.value
        setScores(getScores())
    }

    function getScores() {
        // Get scores from local storage
        return localStorage.getItem(scoreName) ? JSON.parse(localStorage.getItem(scoreName)) : []
    }

    function Select() {
        return (
            <select className="start-screen--dropdown" onChange={handleSelectChange} value={scoreName}>
                <option value="world_scores" >World</option>
                <option value="africa_scores">Africa</option>
                <option value="asia_scores">Asia</option>
                <option value="europe_scores">Europe</option>
                <option value="northAmerica_scores">North America</option>
                <option value="oceania_scores">Oceania</option>
                <option value="southAmerica_scores">South America</option>
            </select>
        )
    }

    // If there are scores in the list
    if (scores.length > 0) {
        return (
            <div className="highscores">
                <Select />
                <h3 className="highscores--title">Highscores:</h3>
                <ol className="highscores--list">
                    {
                        // Loop through scores and display them
                        scores.map(item => (
                            <li key={item.date}><FaStar className="highscores--list-icon" />{item.score} / {item.total} ({Math.round((100 / (item.total)) * item.score)}%) <FaClock className="highscores--list-icon" /> {String(item.time.min).padStart(2, '0')}:{String(item.time.sec).padStart(2, '0')}</li>
                        ))}
                </ol>
            </div>
        )
    }

    return (
        <div className="highscores">
            <Select />
            <p>You best scores will be displayed here...</p>
        </div>)
}