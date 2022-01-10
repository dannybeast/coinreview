import {convertDateToUTC} from "./helpers";

export const setTimer = () => {
    const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

    $('.timer').each(function (i) {
        let days = $(this).data('days')
        let hours = $(this).data('hours')
        let minutes = $(this).data('minutes')
        let seconds = $(this).data('seconds')

        $(this).append(`
      <div class="timer__col">
        <div class="timer__count timer__count_days"></div>
        <p class="timer__desc">${days}</p>
      </div>
      <div class="timer__col">
        <div class="timer__count timer__count_hours"></div>
        <p class="timer__desc">${hours}</p>
      </div>
      <div class="timer__col">
        <div class="timer__count timer__count_minutes"></div>
        <p class="timer__desc">${minutes}</p>
      </div>
      <div class="timer__col">
        <div class="timer__count timer__count_seconds"></div>
        <p class="timer__desc">${seconds}</p>

      </div>

    `)

        setTimeout(() => {
            $(this).addClass('is-loaded')
        }, 1000)
    });

    let timer = setInterval(function (e) {

        $('.timer').each(function (i) {
            var timerValue = $(this).attr('data-timer-end');
            let over = $(this).data('over')

            timerValue = convertDateToUTC(new Date(timerValue))
            let countDown = timerValue.getTime();
            let newDate = new Date()
            let now = convertDateToUTC(newDate).getTime()
            let distance = countDown - now - newDate.getTimezoneOffset() * 60000;

            if (distance > 0) {
                var days = Array.from(String(Math.floor(distance / (day))), Number);
                var hours = Array.from(String(Math.floor((distance % (day)) / (hour))), Number);
                var minutes = Array.from(String(Math.floor((distance % (hour)) / (minute))), Number);
                var seconds = Array.from(String(Math.floor((distance % (minute)) / second)), Number);

                if (days.length < 2) {
                    days.splice(0, 0, 0);
                }
                if (minutes.length < 2) {
                    minutes.splice(0, 0, 0);
                }
                if (hours.length < 2) {
                    hours.splice(0, 0, 0);
                }
                if (seconds.length < 2) {
                    seconds.splice(0, 0, 0);
                }

                $(this).find('.timer__count_days').html('')
                $(this).find('.timer__count_hours').html('')
                $(this).find('.timer__count_minutes').html('')
                $(this).find('.timer__count_seconds').html('')


                days.forEach((el) => {
                    $(this).find('.timer__count_days').append(`<span>${el}</span>`);
                })
                hours.forEach((el) => {
                    $(this).find('.timer__count_hours').append(`<span>${el}</span>`);
                })
                minutes.forEach((el) => {
                    $(this).find('.timer__count_minutes').append(`<span>${el}</span>`);
                })
                seconds.forEach((el) => {
                    $(this).find('.timer__count_seconds').append(`<span>${el}</span>`);
                })
            } else {
                $(this).html(`<p class="timer__over">${over}</p>`)
            }


        });
    }, second)
}

window.setTimer = setTimer;