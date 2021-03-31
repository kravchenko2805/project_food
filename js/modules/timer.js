function timer (id, deadline) {
    //    Timer


    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(Date()),
            days = Math.floor(t / (60 * 1000 * 60 * 24)),
            hours = Math.floor((t / (60 * 1000 * 60)) % 24),
            minutes = Math.floor((t / (60 * 1000)) % 60),
            seconds = Math.floor((t / 1000) % 60);


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function addZero(num) {
        if (num > 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const time = getTimeRemaining(endtime);

            if (time.total > 0) {
                days.innerHTML = addZero(time.days);
                hours.innerHTML = addZero(time.hours);
                minutes.innerHTML = addZero(time.minutes);
                seconds.innerHTML = addZero(time.seconds);
            } else {
                days.innerHTML = "0";
                hours.innerHTML = "0";
                minutes.innerHTML = "0";
                seconds.innerHTML = "0";
            }

            if (time.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadLine);
}

export default timer;