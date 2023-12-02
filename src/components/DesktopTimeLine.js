import { useState, useEffect } from "react";
import { differenceInSeconds } from "date-fns";

const DesktopTimeLine = ({ hourLen, fromTime, endTime }) => {

    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 60 * 1000); // 60 * 1000 ms = 1 minute

        return () => clearInterval(interval); // Cleanup on component unmount
    }, []);

    const startOfDayUTC = new Date(Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        0, 0, 0, 0
    ));


    const secondsPassed = differenceInSeconds(
        now,
        startOfDayUTC
    );

    const hoursPassed = secondsPassed / 60 / 60 - fromTime;

    return (
        <div className="desktop-timeline-wrapper">
            {
                hoursPassed > 0 && hoursPassed < (endTime - fromTime) &&
                <div
                    className="desktop-timeline"
                    style={{
                        marginTop: hoursPassed * hourLen + "rem"
                    }}
                >
                    <div></div>
                </div>
            }
        </div>
    );
}

export default DesktopTimeLine;