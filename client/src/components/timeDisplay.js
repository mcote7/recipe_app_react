import React, { useEffect, useState } from 'react';

const Time = () => {
    const [time, setTime] = useState(new Date().toLocaleString());

    useEffect(() => {
        const int = setInterval(
            () => setTime(new Date().toLocaleString()),
            1000
        );

        return function clearInt() {
            clearInterval(int);
        }
    }, []);

    return (
        <div>{time}</div>
    );
};
export default Time;