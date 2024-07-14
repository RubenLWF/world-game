// Import icon
import { FaStar } from 'react-icons/fa'

export default function Score({ flagIndex, score }) {

    // If not at the first flag
    if (flagIndex > 0) {
        return (
            <div className="game--score">
                <p><FaStar className="game--score-icon"/> {score} / {flagIndex} ({Math.floor((100 / (flagIndex)) * score)}%)</p>
            </div>
        )
    }

    return (
        <div className="game--score">
            <p><FaStar className="game--score-icon"/> Score...</p>
        </div>)
}