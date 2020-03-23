/* eslint-disable no-use-before-define */
/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
// sc: https://ru.hexlet.io/courses/js-polymorphism/lessons/state/exercise_unit

// Реализуйте логику работы часов из теории.

// В режиме будильника, часы и минуты изменяются независимо и никак друг на друга не
// влияют (как и в большинстве реальных будильников). То есть если происходит увеличение
// минут с 59 до 60 (сброс на 00), то цифра с часами остается неизменной
// Интерфейсными методами часов являются:

// clickMode() - нажатие на кнопку Mode
// longClickMode() - долгое нажатие на кнопку Mode
// clickH() - нажатие на кнопку H
// clickM() - нажатие на кнопку M
// tick() - при вызове увеличивает время на одну минуту и, если нужно, активирует звонок
// будильника
// isAlarmOn() - показывает включен ли режим будильника
// isAlarmTime() - возвращает true, если время на часах совпадает со временем на
// будильнике
// minutes() - возвращает минуты, установленные на часах
// hours() - возвращает часы, установленные на часах
// alarmMinutes() - возвращает минуты, установленные на будильнике
// alarmHours() - возвращает часы, установленные на будильнике
// getCurrentMode() - возвращает текущий режим (alarm | clock | bell)
// Основной спецификацией к данной задаче нужно считать тесты.

// AlarmClock.js
// Реализуйте интерфейсные методы и логику работы часов.

// State.js/AlarmState.js/BellState.js/ClockState.js
// Реализуйте иерархию состояний, в корне которой находится State.

// Подсказки
// (Если вы знакомы с наследованием) В State.js можно вынести повторяющуюся логику всех
// состояний

// import AlarmState from 'AlarmState.js';
// import BellState from 'BellState.js';
// import ClockState from 'ClockState.js';

export default class AlarmClock {
    mapClassNameToClass = {
        ClockState,
        AlarmState,
        BellState,
    };

    time = {
        clock: { hours: 12, minutes: 0 },
        alarm: { hours: 6, minutes: 0 },
    };

    alarmOn = false;

    constructor() {
        this.setState('ClockState');
    }

    clickMode() {
        this.state.changeState();
    }

    longClickMode() {
        // this.clickMode(); - test bad for this
        this.alarmOn = !this.alarmOn;
    }

    clickH() {
        this.state.incrementH();
    }

    clickM() {
        this.state.incrementM();
    }

    tick() {
        this.incrementM('clock');
        if (this.minutes() === 0) {
            this.incrementH('clock');
        }
        this.state.tick();
    }

    isAlarmOn() {
        return this.alarmOn;
    }

    isAlarmTime() {
        return (
            this.time.clock.hours === this.time.alarm.hours &&
            this.time.clock.minutes === this.time.alarm.minutes
        );
    }

    minutes() {
        return this.time.clock.minutes;
    }

    hours() {
        return this.time.clock.hours;
    }

    alarmMinutes() {
        return this.time.alarm.minutes;
    }

    alarmHours() {
        return this.time.alarm.hours;
    }

    getCurrentMode() {
        return this.state.getModeName();
    }

    setState(className) {
        const ClassState = this.mapClassNameToClass[className];
        this.state = new ClassState(this);
    }

    incrementH(mode) {
        const data = this.time[mode];
        data.hours = (data.hours + 1) % 24;
    }

    incrementM(mode) {
        const data = this.time[mode];
        data.minutes = (data.minutes + 1) % 60;
    }
}

// State.js

// export default
class State {
    constructor(clockThis) {
        this.clock = clockThis;
    }

    changeState(stateClassName = this.nextState) {
        this.clock.setState(stateClassName);
    }

    getModeName() {
        return this.mode;
    }
}

// AlarmState.js
// import State from 'State.js';

// export default
class AlarmState extends State {
    mode = 'alarm';

    nextState = 'ClockState';

    incrementH() {
        this.clock.incrementH(this.mode);
    }

    incrementM() {
        this.clock.incrementM(this.mode);
    }

    tick() {
        if (this.clock.isAlarmTime() && this.clock.isAlarmOn()) {
            this.changeState('BellState');
        }
    }
}

// BellState.js
// import State from 'State.js';

// export default
class BellState extends State {
    mode = 'bell';

    nextState = 'ClockState';

    incrementH() {}

    incrementM() {}

    tick() {
        this.changeState();
    }
}

// ClockState.js
// import State from 'State.js';

// export default
class ClockState extends State {
    mode = 'clock';

    nextState = 'AlarmState';

    incrementH() {
        this.clock.incrementH(this.mode);
    }

    incrementM() {
        this.clock.incrementM(this.mode);
    }

    tick() {
        if (this.clock.isAlarmTime() && this.clock.isAlarmOn()) {
            this.changeState('BellState');
        }
    }
}
