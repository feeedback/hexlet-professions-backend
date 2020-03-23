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

class AlarmClock {
    constructor() {
        this._hours = 12;
        this._minutes = 0;
        this._alarmHours = 6;
        this._alarmMinutes = 0;
        this._isAlarmOn = false;
        this.setState('clock');
    }

    setState(className) {
        const mapStates = {
            clock: ClockState,
            alarm: AlarmState,
            bell: BellState,
        };
        this.state = new mapStates[className](this);
    }

    clickMode() {
        // нажатие на кнопку Mode
        this.state.clickMode();
    }

    longClickMode() {
        // долгое нажатие на кнопку Mode
        this.state.longClickMode();
    }

    clickH() {
        // нажатие на кнопку H
        this.state.clickH();
    }

    clickM() {
        // нажатие на кнопку M
        this.state.clickM();
    }

    tick() {
        // при вызове увеличивает время на одну минуту и, если нужно, активирует звонок
        // будильника
        this.state.tick();
    }

    isAlarmOn() {
        // показывает включен ли режим будильника
        return this._isAlarmOn;
    }

    isAlarmTime() {
        // возвращает true, если время на часах совпадает со временем на будильнике
        return this._hours === this._alarmHours && this._minutes === this._alarmMinutes;
    }

    minutes() {
        // возвращает минуты, установленные на часах
        return this._minutes;
    }

    hours() {
        // возвращает часы, установленные на часах
        return this._hours;
    }

    alarmMinutes() {
        // возвращает минуты, установленные на будильнике
        return this._alarmMinutes;
    }

    alarmHours() {
        // возвращает часы, установленные на будильнике
        return this._alarmHours;
    }

    getCurrentMode() {
        // возвращает текущий режим (alarm | clock | bell)
        return `${this.state}`;
    }
}

// State.js

class State {
    constructor(clockThis) {
        this.clock = clockThis;
    }

    clickMode() {
        // нажатие на кнопку Mode
        this.clock.setState('alarm');
    }

    longClickMode() {
        // долгое нажатие на кнопку Mode
        this.clock._isAlarmOn = !this.clock.isAlarmOn();
    }

    clickH() {
        // нажатие на кнопку H
        this.clock._hours = (this.clock.hours() + 1) % 24;
    }

    clickM() {
        // нажатие на кнопку M
        this.clock._minutes = (this.clock.minutes() + 1) % 60;
        if (this.clock.minutes() === 0) {
            this.clock._hours = (this.clock.hours() + 1) % 24;
        }
    }

    tick() {
        // при вызове увеличивает время на одну минуту и, если нужно, активирует
        // звонок будильника
        this.clock._minutes = (this.clock.minutes() + 1) % 60;
        if (this.clock.minutes() === 0) {
            this.clock._hours = (this.clock.hours() + 1) % 24;
        }
    }
}

// AlarmState.js
// import State from 'State.js';

class AlarmState extends State {
    clickMode() {
        // нажатие на кнопку Mode
        this.clock.setState('clock');
    }

    longClickMode() {
        // долгое нажатие на кнопку Mode
        super.longClickMode();

        this.clickMode();
    }

    clickH() {
        // нажатие на кнопку H
        this.clock._alarmHours = (this.clock._alarmHours + 1) % 24;
    }

    clickM() {
        // нажатие на кнопку M
        this.clock._alarmMinutes = (this.clock.alarmMinutes() + 1) % 60;
    }

    tick() {
        // при вызове увеличивает время на одну минуту и, если нужно, активирует
        // звонок будильника
        super.tick();
        if (this.clock.isAlarmTime() && this.clock.isAlarmOn()) {
            this.clock.setState('bell');
        }
    }

    toString() {
        return 'alarm';
    }
}

// BellState.js
// import State from 'State.js';

class BellState extends State {
    clickMode() {
        // нажатие на кнопку Mode
        this.clock.setState('clock');
    }

    longClickMode() {
        // долгое нажатие на кнопку Mode
        super.longClickMode();

        this.clickMode();
    }

    clickH() {
        // нажатие на кнопку H
    }

    clickM() {
        // нажатие на кнопку M
    }

    tick() {
        // при вызове увеличивает время на одну минуту и, если нужно, активирует
        // звонок будильника
        super.tick();
        if (this.clock.isAlarmTime() === false) {
            this.clock.setState('clock');
        }
    }

    toString() {
        return 'bell';
    }
}

// ClockState.js
// import State from 'State.js';

class ClockState extends State {
    tick() {
        // при вызове увеличивает время на одну минуту и, если нужно, активирует
        // звонок будильника
        super.tick();
        if (this.clock.isAlarmTime() && this.clock.isAlarmOn()) {
            this.clock.setState('bell');
        }
    }

    toString() {
        return 'clock';
    }
}
