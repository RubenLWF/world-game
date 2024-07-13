import { useState } from "react"

import { FaStar } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa'

var scoreName = "world_scores"

export default function Highscores() {
    const [scores, setScores] = useState( getScores() )

    const handleSelectChange = (event) => {
        switch (event.target.value) {
            case "world":
                scoreName = "world_scores"
                setScores(getScores())
                break
            case "africa":
                scoreName = "africa_scores"
                setScores(getScores())
                break
            case "asia":
                scoreName = "asia_scores"
                setScores(getScores())
                break
            case "europe":
                scoreName = "europe_scores"
                setScores(getScores())
                break
            case "northAmerica":
                scoreName = "northAmerica_scores"
                setScores(getScores())
                break
            case "oceania":
                scoreName = "oceania_scores"
                setScores(getScores())
                break
            case "southAmerica":
                scoreName = "southAmerica_scores"
                setScores(getScores())
                break
            default:
                scoreName = "world_scores"
                setScores(getScores())
        }
    };

    function getScores() {
        return localStorage.getItem(scoreName) ? JSON.parse(localStorage.getItem(scoreName)) : []
    }

    if (scores.length > 0) {
        return (
            <div className="highscores">
                <select className="start-screen--dropdown" onChange={handleSelectChange}>
                <option value="world">World</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="northAmerica">North America</option>
                <option value="oceania">Oceania</option>
                <option value="southAmerica">South America</option>
            </select>
                <ol className="highscores--list">
                    {
                        scores.map(item => (
                            <li key={item.date}><FaStar className="highscores--list-icon" />{item.score} / {item.total} ({Math.round((100 / (item.total)) * item.score)}%) <FaClock className="highscores--list-icon" /> {String(item.time.min).padStart(2, '0')}:{String(item.time.sec).padStart(2, '0')}</li>
                        ))}
                </ol>
            </div>
        )
    }

    return (
        <div className="highscores">
            <select className="start-screen--dropdown" onChange={handleSelectChange}>
                <option value="world">World</option>
                <option value="africa">Africa</option>
                <option value="asia">Asia</option>
                <option value="europe">Europe</option>
                <option value="northAmerica">North America</option>
                <option value="oceania">Oceania</option>
                <option value="southAmerica">South America</option>
            </select>
            <p>You best scores will be displayed here...</p>
        </div>)
}