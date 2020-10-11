class StateComputer {
    constructor() {
        this.sessionDuration = 30 * 1000; // in milliseconds
        this.playing = false;

        this.currentInterval;
        this.remainingMs;
        this.lastMark;
        this.currentStateIndex;
        this.sessionStartTime;
        this.states = [
            // durations are in milliseconds
            {
                action: 'inhale',
                text: 'inhale',
                duration: 3000
            },
            {
                action: 'inhale pause',
                text: 'inhale',
                duration: 1000
            },
            {
                action: 'exhale',
                text: 'exhale',
                duration: 5000
            },
            {
                action: 'exhale pause',
                text: 'exhale',
                duration: 1000
            }
        ];
    }

    startSession = () => {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
        }
        this.currentStateIndex = undefined;
        this.sessionStartTime = millis();
        this.playing = true;
        this.updateState();
    };

    updateState = () => {
        this.currentStateIndex = (this.currentStateIndex + 1) % this.states.length || 0;
        this.lastMark = millis();
        const timeout = this.states[this.currentStateIndex].duration;

        if (this.remainingMs < 0 && this.currentStateIndex === this.states.length - 1) {
            this.playing = false;
        }

        if (this.playing) {
            this.currentInterval = setTimeout(this.updateState, timeout);
        }
    };

    getUpdate = () => {
        return {
            action: this.getCurrentAction(),
            percentage: this.getCurrentPercentage(),
            countDown: this.getRemainingTime(),
            playing: this.playing
        };
    };

    getRemainingTime = () => {
        if (!this.playing) {
            return -1;
        }

        const currentlyElapsed = millis() - this.sessionStartTime;
        this.remainingMs = this.sessionDuration - currentlyElapsed;

        return parseInt(this.remainingMs / 1000);
    };

    getCurrentPercentage = () => {
        if (!this.playing) {
            return -1;
        }
        const currentlyElapsed = millis() - this.lastMark;
        const currentDuration = this.states[this.currentStateIndex]?.duration;

        if (this.currentStateIndex === 0) {
            const r = map(currentlyElapsed, 0, currentDuration, 0, 100);
            return parseInt(r);
        }

        if (this.currentStateIndex === 1) {
            return 100;
        }

        if (this.currentStateIndex === 2) {
            const r = map(currentlyElapsed, 0, currentDuration, 100, 0);
            return parseInt(r);
        }

        if (this.currentStateIndex === 3) {
            return 0;
        }
    };

    getCurrentAction = () => {
        if (!this.playing) {
            return 'N.A';
        }
        return this.states[this.currentStateIndex].action;
    };
}
