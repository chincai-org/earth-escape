class Sound {
    constructor(sound) {
        this.audio = [];
        sound.forEach(element => {
            this.audio.push({
                audio: new Audio(element.link),
                name: element.name,
                group: element.group
            });
        });
        this.slowStopRunning = {
            active: false,
            n: 0
        }
    };
    repeat(nameOrGroup, type="name", repeat=true) {
        if (type == "name") {
            this.audio.find(element => element.name === nameOrGroup).audio.loop = repeat;
        } else if (type == "group") {
            this.audio.filter(element => element.group === nameOrGroup).forEach(element => {
                element.audio.loop = repeat;
            });
        }          
    }
    stop(nameOrGroup, type="name") {
        if (type == "name") {
            let audio = this.audio.find(element => element.name === nameOrGroup).audio;
            audio.pause();
            audio.currentTime = 0;
        } else if (type == "group") {
            this.audio.filter(element => element.group === nameOrGroup).forEach(element => {
                element.audio.pause();
                element.audio.currentTime = 0;
            });
        }
    }
    pause(nameOrGroup, type="name") {
        if (type == "name") {
            this.audio.find(element => element.name === nameOrGroup).audio.pause();
        } else if (type == "group") {
            this.audio.filter(element => element.group === nameOrGroup).forEach(element => {
                element.audio.pause();
            });
        }
    }
    play(nameOrGroup, type="name") {
        if (type == "name") {
            this.audio.find(element => element.name === nameOrGroup).audio.play();
        } else if (type == "group") {
            this.audio.filter(element => element.group === nameOrGroup).forEach(element => {
                element.audio.play();
            });
        }
    }
    volume(nameOrGroup, type="name", volume) {
        if (type == "name") {
            let audio = this.audio.find(element => element.name === nameOrGroup).audio;
            if (volume == undefined) {
                return audio.volume;
            } else {
                audio.volume = volume;
            }
        } else if (type == "group") {
            let audio = this.audio.filter(element => element.group === nameOrGroup);
            if (volume == undefined) {
                let audioVolume = [];
                audio.forEach(element => {
                    audioVolume.push({ 
                        name: element.name,
                        group: element.group,
                        volume: element.audio.volume
                    });
                });
                return audioVolume;
            } else {
                audio.forEach(element => {
                    element.audio.volume = volume;
                });
            }
        }
    }
    isPlaying(nameOrGroup, type="name") {
        if (nameOrGroup == undefined) {
            let audio = [];
            this.audio.forEach(element => {
                if (!element.audio.paused) {
                    audio.push({
                        name: element.name,
                        group: element.group,
                        isPlaying: true
                    });
                }
            });
            return audio;
        } else {
            if (type == "name") {
                let audio = this.audio.find(element => element.name === nameOrGroup).audio.paused;
                return !audio;
            } else if (type == "group") {
                let audio = [];
                this.audio.filter(element => element.group === nameOrGroup).forEach(element => {
                    audio.push({ 
                        name: element.name,
                        group: element.group,
                        isPlaying: !element.audio.paused
                    });
                }); 
                return audio;
            }
        }
    }
    slowStopAll() {
        this.slowStopRunning.active = true;
    }
    playPlaylist(n) {
        this.slowStopAll();
        setTimeout(() => {
            if (n == 0) {
                this.play("backgroundmusic");
            } else if (n == 1) {
                this.play("backgroundmusicv1");
            } else if (n == 2) {
                this.play("backgroundmusicv2");
            }
        }, 5000);
    }
}