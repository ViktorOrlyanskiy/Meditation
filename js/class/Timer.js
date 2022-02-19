export default class Timer {

    /**
    * properties
    * @param 
    
    */

    constructor(output) {
        this.output = output; // элемент вставки таймера

        this._time = 0; // текущее время
        this._startTime = 0; // стартовое время
        this._timePersent = 0; // процент прошедшего времени
        this._timerId = 0; // id таймера

        this._circle = null; // круг прогресса html-element
        this._timeOutput = null; // поле вывода времени отсчета html-element
        this._statusTimer = null; // текущий статус таймера play/pause
        this._playButton = null; // кнопка play html-element
        this._pauseButton = null; // кнопка pause html-element
        this._video = null; // текущее видео со страницы
        this._audio = null; // текущее аудио со страницы

        // svg element для render()
        this.button = {
            play: `
            <svg width="512px" height="512px" viewBox="0 0 512 512">
            <path
                d="M133,440a35.37,35.37,0,0,1-17.5-4.67c-12-6.8-19.46-20-19.46-34.33V111c0-14.37,7.46-27.53,19.46-34.33a35.13,35.13,0,0,1,35.77.45L399.12,225.48a36,36,0,0,1,0,61L151.23,434.88A35.5,35.5,0,0,1,133,440Z" />
            </svg>`,

            pause: `
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 47.607 47.607" style="enable-background:new 0 0 47.607 47.607;"
            xml:space="preserve">
            <g>
                <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
                l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" />
                <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
                C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z" />
            </g>
            </svg>`,
        };
    }



    /**
    * Method _setElementsHTML() - записывает html-элементы в свойства конструктора
    */
    _setElementsHTML() {
        if (this._circle === null) {
            this._circle = document.querySelector('.progress-front__circle');
        }
        if (this._timeOutput === null) {
            this._timeOutput = document.querySelector('.time');
        }
        if (this._playButton === null) {
            this._playButton = document.querySelector('.button__play');
        }
        if (this._pauseButton === null) {
            this._pauseButton = document.querySelector('.button__pause');
        }
        if (this._video === null) {
            this._video = document.querySelector('.full-screen__video');
        }
        if (this._audio === null) {
            this._audio = document.querySelector('.audio');
        }
    }

    /**
    * Method setTime(string) - записывает time и скрыто получает html-элементы со страницы
    */
    setTime(time) {
        this._time = +time;
        this._startTime = +time;

        this._setElementsHTML();
        this._showTime(this._startTime);
    }

    /**
    * Method _timer() - отсчитывает время // >> play()
    */
    _timer() {
        this._showTime(this._time);
        this._changeTimePersent();
        this._showProgress();

        this._time--;

        this._timerId = setTimeout(this._timer.bind(this), 1000);

        if (this._time < 0) {
            this._finish();

        }
    }

    /**
    * Method _showTime(number) - выводит время на страницу html // >> _timer()
    */
    _showTime(num) {

        const min = Math.floor(num / 60);
        const sec = num % 60;

        const normalizNum = function (num) {
            return (num < 10) ? '0' + num : num;
        }

        const result = `${normalizNum(min)}:${normalizNum(sec)}`;
        this._timeOutput.innerHTML = result;
        console.log(result)
    }

    /**
    * Method _showProgress(number) - выводит прогресс на страницу html // >> _timer()
    */
    _showProgress() {

        this._circle.classList.remove('hidden');
        let radius = this._circle.r.baseVal.value;
        let circumference = 2 * Math.PI * radius;

        this._circle.style.strokeDasharray = `${circumference} ${circumference}`;
        this._circle.style.strokeDashoffset = circumference;

        let offset = circumference - this._timePersent / 100 * circumference;
        this._circle.style.strokeDashoffset = offset;
    }

    /**
    * Method _changeTimePersent() - изменяет процент прошедшего времени // >> _timer()
    */
    _changeTimePersent() {
        this._timePersent = 100 * ((this._startTime - this._time) / this._startTime);
    }

    /**
    * Method reset() - очищает timerId, скрывает круг прогресса, меняет кнопку pause/play
    * ставит видео на стоп.
    */
    reset() {
        clearTimeout(this._timerId);
        this._circle.classList.add('hidden');
        this._statusTimer = 'pause';

        this._playButton.classList.remove('hidden');
        this._pauseButton.classList.add('hidden');

        this._videoStop();
    }

    /**
    * Method play() - запускает таймер и продолжает отчет после паузы
    */
    play() {
        if (this._startTime !== 0) {
            this._timer();
            this._statusTimer = 'play';

            this._video.play();
            this._audio.play();
        }
    }

    /**
    * Method pause() - ставит таймер на паузу
    */
    pause() {
        clearTimeout(this._timerId);
        this._statusTimer = 'pause';

        this._video.pause();
        this._audio.pause();
    }

    /**
    * Method _finish() - очищает timerId, обнуляет startTime, меняет кнопку pause/play // >> _timer()
    */
    _finish() {
        clearTimeout(this._timerId);
        this._startTime = 0;
        this._statusTimer = 'pause';

        this._playButton.classList.remove('hidden');
        this._pauseButton.classList.add('hidden');

        this._videoStop();
    }

    /**
    * Method _videoStop() - ставит видео/аудио на стоп // >> _reset() / _finish()
    */
    _videoStop() {
        this._video.pause();
        this._audio.pause();
        this._video.currentTime = 0;
        this._audio.currentTime = 0;
    }

    /**
    * Method changeButton({ }) - меняет кнопки play и pause на странице hnml
    */
    changeButtons({ play, pause }) {
        if (this._startTime !== 0) {
            if (play.classList.contains('hidden')) {
                play.classList.remove('hidden');
                pause.classList.add('hidden');
            }
            else if (pause.classList.contains('hidden')) {
                pause.classList.remove('hidden');
                play.classList.add('hidden');
            }
        }
    }

    /**
    * Method getStatusTimer() - возвращает статус таймера (play/pause) 
    */
    getStatusTimer() {
        return this._statusTimer;
    }

    /**
    * Method render - отрисовывает блок таймера на странице html
    */
    render() {
        this.output.innerHTML = `
            <div class="timer">
            <div class="timer__buttons">
                <div class="button__play">
                    ${this.button.play} 
                </div>
                <div class="button__pause hidden">
                    ${this.button.pause} 
                </div>
            </div>
            <div class="timer__progress">
                <div class="progress">
                    <svg class="progress-back">
                        <circle class="progress-back__circle" stroke="#fff" stroke-width="4" cx="150"
                            cy="150" r="148" stroke="#000" fill="transparent" />
                    </svg>
                    <svg class="progress-front">
                        <circle class="progress-front__circle hidden" stroke="green" stroke-width="5" cx="150"
                            cy="150" r="147.9" stroke="#000" fill="transparent" />
                    </svg>
                </div>
            </div>
            <div class="timer__output">
                <div class="time">00:00</div>
            </div>
        </div>`
    }
}