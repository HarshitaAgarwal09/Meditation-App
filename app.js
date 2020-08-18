const app = () => {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.video-container video');
    const timeDisplay = document.querySelector('.time-display');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    const times = document.querySelectorAll('.time-select button');

    let duration = 600;

    const outlineLength = outline.getTotalLength();
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    times.forEach(option => {
        option.addEventListener("click", function () {
            outline.style.strokeDashoffset = outlineLength;
            duration = this.getAttribute("data-time");

            song.currentTime = 0;

            let seconds = Math.floor(duration % 60);
            let minutes = Math.floor(duration / 60);
            timeDisplay.textContent = `${minutes}:${seconds}`;
        })
    })

    sounds.forEach(option => {
        option.addEventListener("click", function () {
            video.src = this.getAttribute("data-video");
            song.src = this.getAttribute("data-sound");
            checkPlaying(song);
        })
    })

    play.addEventListener("click", () => {
        checkPlaying(song);
    })

    const checkPlaying = song => {
        if (song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        }
        else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    }

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;

        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`;

        if (currentTime > duration) {
            song.pause();
            video.pause();

            song.currentTime = 0;
            play.src = './svg/play.svg';
        }
    }

}

app();