/*
 * Originally I created this class using the keyword `class` hoping to do things the right way.
 * But it turns out that it doesn't seem to work properly with Safari.
 * I suspect that the issue comes from hoisting which might differ in Safari.
 * I'll need to investigate more but in the meantime I'll keep it this way
 */
function StateComputer() {
    this.sessionDuration = appSettings.time * 60 * 1000; // in milliseconds
    this.playing = false;

    this.inStartPeriod;
    this.inEndPeriod;
    this.showInstruction;
    this.endShowInstructionPeriod;
    this.countDownShowingPeriod = 5 * 1000; // in ms
    this.currentInterval;
    this.remainingMs;
    this.lastMark;
    this.currentStateIndex;
    this.sessionStartTime;
    this.states = [
        // durations are in milliseconds
        {
            action: 'inhale',
            text: 'Breath in',
            duration: 4000
        },
        {
            action: 'inhale pause',
            text: 'Breath in',
            duration: 500
        },
        {
            action: 'exhale',
            text: 'Breath out',
            duration: 6000
        },
        {
            action: 'exhale pause',
            text: 'Breath out',
            duration: 200
        }
    ];

    this.startSession = () => {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
        }
        this.currentStateIndex = undefined;
        this.sessionStartTime = millis();
        this.playing = true;

        this.inStartPeriod = true;
        this.inEndPeriod = false;
        setTimeout(() => (this.inStartPeriod = false), this.countDownShowingPeriod);

        this.showInstruction = true;
        const showInstructionTime = this.states.map((s) => s.duration).reduce((a, b) => a + b);
        this.endShowInstructionPeriod = millis() + showInstructionTime + this.states[0].duration / 2;
        setTimeout(() => (this.showInstruction = false), showInstructionTime);

        this.updateState();
    };

    this.updateState = () => {
        this.currentStateIndex = (this.currentStateIndex + 1) % this.states.length || 0;
        this.lastMark = millis();
        const timeout = this.states[this.currentStateIndex].duration;

        if (this.remainingMs < 1000 && this.currentStateIndex === this.states.length - 1) {
            this.playing = false;
        }

        if (this.remainingMs < 6000 && this.currentStateIndex === this.states.length - 2) {
            this.inEndPeriod = true;
            this.endPeriodStartTime = millis();
            this.endPeriodEndTime = millis() + 6000;
            setTimeout(() => (this.inEndPeriod = false), 6000);
        }

        if (this.playing) {
            this.currentInterval = setTimeout(this.updateState, timeout);
        }
    };

    this.getUpdate = () => {
        return {
            text: this.getCurrentActionText(),
            action: this.getCurrentAction(),
            percentage: this.getCurrentPercentage(),
            countDown: this.getRemainingTime(),
            playing: this.playing
        };
    };

    this.getRemainingTime = () => {
        if (!this.playing) {
            return -1;
        }

        const currentlyElapsed = millis() - this.sessionStartTime;
        this.remainingMs = this.sessionDuration - currentlyElapsed;

        return parseInt(this.remainingMs / 1000);
    };

    this.getCurrentPercentage = () => {
        if (!this.playing) {
            return 0;
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

    this.getCurrentAction = () => {
        if (!this.playing) {
            return 'N.A';
        }
        return this.states[this.currentStateIndex].action;
    };

    this.getCurrentActionText = () => {
        if (!this.playing) {
            return;
        }
        return this.states[this.currentStateIndex].text;
    };

    this.updateSessionDuration = () => {
        if (!this.playing) {
            this.sessionDuration = appSettings.time * 60 * 1000;
        }
    };
}
