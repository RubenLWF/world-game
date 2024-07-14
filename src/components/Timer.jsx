// Import React hooks
import { useState, useEffect } from "react"

// Import icon
import { FaClock } from 'react-icons/fa'

// Global variable
var returnTime = {
    sec: 0,
    min: 0,
    hr: 0
}

export default function Timer({ sendTime }) {

    const [intervalId, setIntervalId] = useState()
    const [time, setTime] = useState({
        sec: 0,
        min: 0,
        hr: 0
    })

    useEffect(() => {
        // Listen for stop timer event
        window.addEventListener("stopTimer", event => {
            // Send time to parent component
            sendTime(returnTime)
            stopTimer()
        }, { once: true })
    }, [])

    const updateTimer = () => {
        setTime((prev) => {
            let newTime = { ...prev }

            if (newTime.sec < 59) newTime.sec += 1
            else {
                newTime.min += 1
                newTime.sec = 0
            }
            if (newTime.min === 60) {
                newTime.hr += 1
                newTime.min = 0
            }

            returnTime = newTime

            return newTime
        })
    }

    const startTimer = () => {
        let id = setInterval(updateTimer, 1000)
        setIntervalId(id)
    }

    const stopTimer = () => {
        clearInterval(intervalId)
        returnTime = {
            sec: 0,
            min: 0,
            hr: 0
        }
    }

    if (!intervalId) startTimer()

    return (
        <div className="game--timer">
            <p><FaClock className="game--timer-icon" /> {`${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${time.sec}`}</p>
        </div>
    )
}