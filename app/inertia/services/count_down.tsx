import { useEffect, useState } from 'react'

const CountDownTimer = ({ targetDate }: { targetDate: Date | number }) => {
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate).getTime() - new Date().getTime()
    if (difference <= 0) return null

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!timeLeft) {
    return <strong>'Lien expiré'</strong>
  }
  return (
    <strong>
      {`${timeLeft.days}j ${timeLeft.hours}h ${timeLeft.minutes}min ${timeLeft.seconds}sec`}
    </strong>
  )
}

export default CountDownTimer
