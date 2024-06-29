export default function ScoreComponent({i, score}) {
    if (i > 0) {
        return (<p>{score} / {i} ({Math.round((100 / (i)) * score)}%)</p>)
    }

    return (<p>Your score will be displayed here...</p>)
}