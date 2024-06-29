import { FaStar } from 'react-icons/fa'

export default function Score({ flagIndex, score }) {
    if (flagIndex > 0) {
        return (
            <div className="game--score">
                <p><FaStar className="game--score-icon"/> {score} / {flagIndex} ({Math.round((100 / (flagIndex)) * score)}%)</p>
            </div>
        )
    }

    return (
        <div className="game--score">
            <p><FaStar className="game--score-icon"/> Score...</p>
        </div>)
}