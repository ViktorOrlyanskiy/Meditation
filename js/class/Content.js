export default class Content {

    /**
    * properties
    * @param 
    
    */

    constructor() {
        this.outputVideo = document.querySelector('.h-v');
        this.outputAudio = document.querySelector('.h-a');

        this.listContent = ['sea', 'bonfire', 'rain', 'forest'];
        this.count = 0;
        this.currentVideo = `./assets/video/${this.listContent[this.count]}.mp4`;
        this.currentAudio = `./assets/sounds/${this.listContent[this.count]}.mp3`;
    }

    /**
    * Method next - отрисовывает следующее видео и аудио на странице
    */
    next() {
        if (this.count === this.listContent.length - 1) {
            this.count = 0;
        }
        else {
            this.count++;
        }

        this.currentVideo = `./assets/video/${this.listContent[this.count]}.mp4`;
        this.currentAudio = `./assets/sounds/${this.listContent[this.count]}.mp3`;

        this.outputVideo.load();
        this.outputAudio.load();
        this.render();
    }



    /**
    * Method render - отрисовывает текущее видео и аудио на странице
    */
    render() {

        this.outputVideo.innerHTML = `<source src="${this.currentVideo}" type="video/mp4">`;
        this.outputAudio.innerHTML = `<source src="${this.currentAudio}" type="audio/mp3">`;
    }
}