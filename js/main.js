'use strict'
import Timer from "./class/Timer.js"
import Content from "./class/Content.js"



// создает и отрисовывает видео+аудио
const listContent = ['sea', 'bonfire', 'rain', 'forest'];
const content = new Content(listContent);
content.render();


// создает и отрисовывает таймер
const outputTimer = document.querySelector('.column__center');
const timer = new Timer(outputTimer);
timer.render();


// получает кнопку следующее видео
const nextVideo = document.querySelector('.next-content');
nextVideo.addEventListener('click', nextContent);

function nextContent() {
    let time = 0;
    timer.setTime(time);
    timer.reset();
    content.next();
};

const btn = document.querySelectorAll('.set-time');
btn.forEach(elem => {

    elem.addEventListener('click', function () {
        let time = this.dataset.time;
        if (timer.getStatusTimer() !== 'play') {
            timer.setTime(time);
            timer.reset();
        }
    })
})


// запускает и останавливает таймер
{
    const buttons = {
        play: document.querySelector('.button__play'),
        pause: document.querySelector('.button__pause'),
    };

    buttons.play.addEventListener('click', function () {
        timer.changeButtons(buttons);
        timer.play();
    })
    buttons.pause.addEventListener('click', function () {
        timer.changeButtons(buttons);
        timer.pause();
    })
}

