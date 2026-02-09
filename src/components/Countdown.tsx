import { useState, useEffect } from 'react';

const Countdown = () => {
    const targetDate = new Date('2026-03-15T15:00:00');

    const calculateTimeLeft = () => {
        const difference = +targetDate - +new Date();
        let timeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (!isClient) {
        return null; // Avoid hydration mismatch
    }

    const timeUnits = [
        { label: 'DÍAS', value: timeLeft.days },
        { label: 'HRS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEG', value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-4 mt-4 text-center">
            {timeUnits.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                    <span className="text-4xl font-bold font-mono">
                        {String(item.value).padStart(2, '0')}
                    </span>
                    <span className="text-sm mt-1">{item.label}</span>
                </div>
            ))}
        </div>
    );
};

export default Countdown;
