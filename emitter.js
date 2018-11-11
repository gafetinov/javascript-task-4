'use strict';

/**
 * Сделано задание на звездочку
 * Реализованы методы several и through
 */
const isStar = false;

/**
 * Возвращает новый emitter
 * @returns {Object}
 */
function getEmitter() {
    let lectures = {};

    return {

        /*
         * Подписаться на событие
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         */
        on: function (event, context, handler) {
            if (typeof event !== 'string' ||
                typeof handler !== 'function' ||
                typeof context !== 'object') {
                throw new TypeError();
            }
            console.info(event, context, handler);
            if (!(event in lectures)) {
                lectures[event] = [];
            }
            lectures[event].push({ context, handler });

            return this;

        },

        /*
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            if (typeof event !== 'string' ||
                typeof context !== 'object') {
                throw new TypeError();
            }
            console.info(event, context);
            let partOfEvent = event + '.';
            for (let lecture in lectures) {
                if (lecture === event || lecture.startsWith(partOfEvent)) {
                    lectures[lecture] = lectures[lecture].filter(i => i.context !== context);
                }
            }

            return this;
        },

        /*
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            if (typeof event !== 'string') {
                throw new TypeError();
            }
            let events = [event];
            console.info(event);
            while (events[events.length - 1] !== '') {
                let currentEvent = events[events.length - 1];
                if (currentEvent in lectures) {
                    lectures[currentEvent]
                        .forEach(eventData => eventData.handler.call(eventData.context));
                }
                events.push(currentEvent.substring(0, currentEvent.lastIndexOf('.')));
            }

            return this;
        },

        /**
         * Подписаться на событие с ограничением по количеству полученных уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} times – сколько раз получить уведомление
         */
        several: function (event, context, handler, times) {
            console.info(event, context, handler, times);
        },

        /**
         * Подписаться на событие с ограничением по частоте получения уведомлений
         * @star
         * @param {String} event
         * @param {Object} context
         * @param {Function} handler
         * @param {Number} frequency – как часто уведомлять
         */
        through: function (event, context, handler, frequency) {
            console.info(event, context, handler, frequency);
        }
    };
}

module.exports = {
    getEmitter,

    isStar
};
