'use strict'
import Timer from "./class/Timer.js"
import Content from "./class/Content.js"


// создает и отрисовывает видео+аудио
const content = new Content();
content.render();


// создает и отрисовывает таймер
const outputTimer = document.querySelector('.column__center');
const timer = new Timer(outputTimer);
timer.render();


// получает кнопку следующее видео
const nextVideo = document.querySelector('.help');
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
            if (timer.video === null) {
                timer.video = document.querySelector('.full-screen__video');
                timer.audio = document.querySelector('.audio');

            }
            timer.setTime(time);
            timer.reset();
        }
    })
})


// const video = document.querySelectorAll('video');
// const audio = document.querySelectorAll('audio');

// const btnSetVideo = document.querySelectorAll('.set-video');
// btnSetVideo.forEach(elem => {

//     let funcParameters = { elements: video, setClassCSS: 'hidden' };

//     elem.addEventListener('click', function () {

//         funcParameters.searchClassCSS = this.dataset.video;
//         changeClassCSS(funcParameters);
//         timer.video = getCurrentContent(funcParameters)

//     })
// })


function getCurrentContent({ elements, searchClassCSS, setClassCSS }) {

    let currentContent;

    const changeClassCSS = function () {
        elements.forEach(element => {
            if (element.classList.contains(searchClassCSS)) {
                element.classList.remove(setClassCSS);
                currentContent = element;
            }
            else {
                element.classList.add(setClassCSS);
            }
        })
    }
    changeClassCSS();
    return currentContent;
}


function changeClassCSS({ elements, searchClassCSS, setClassCSS }) {
    elements.forEach(element => {
        if (element.classList.contains(searchClassCSS)) {
            element.classList.remove(setClassCSS)
        }
        else {
            element.classList.add(setClassCSS)
        }
    })
}


// запускает и останавливает таймер
{
    const buttons = {
        play: document.querySelector('.button__play'),
        pause: document.querySelector('.button__pause'),
    };

    buttons.play.addEventListener('click', function () {
        timer.changeButtons(buttons);
        timer.play();

        // nextVideo.removeEventListener('click', nextContent);
    })
    buttons.pause.addEventListener('click', function () {
        timer.changeButtons(buttons);
        timer.pause();

        // nextVideo.addEventListener('click', nextContent);
    })
}

