import { FaStar } from 'react-icons/fa'
import { FaClock } from 'react-icons/fa'

import countries from '../assets/countries.json'

const countriesAmount = countries.length

export default function Highscores() {
    var scores = localStorage.getItem('scores') ? JSON.parse(localStorage.getItem('scores')) : []

    if (scores.length > 0) {
        return (
            <div className="start--highscores">
                <ol className="start--highscores-list">
                    {
                        scores.map(item => (
                            <li key={item.date}><FaStar className="start--highscores-icon" />{item.score} / {countriesAmount} ({Math.round((100 / (countriesAmount)) * item.score)}%) <FaClock className="start--highscores-icon" /> {String(item.time.min).padStart(2, '0')}:{String(item.time.sec).padStart(2, '0')}</li>
                        ))}
                </ol>
            </div>
        )
    }

    return (
        <div className="start--highscores">
            <p>You best scores will be displayed here...</p>
        </div>)
}