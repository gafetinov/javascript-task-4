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
            lectures[event].push({ context: context, handler: handler });

            return this;

        },

        /*
         * Отписаться от события
         * @param {String} event
         * @param {Object} context
         */
        off: function (event, context) {
            console.info(event, context);
            for (let e in lectures) {
                if (e === event || e.startsWith(event + '.')) {
                    lectures[e] = lectures[e].filter(i => i.context !== context);
                }
            }

            return this;
        },

        /*
         * Уведомить о событии
         * @param {String} event
         */
        emit: function (event) {
            console.info(event);
            while (event !== '') {
                if (event in lectures) {
                    lectures[event].forEach(i => i.handler.call(i.context));
                }
                event = event.substring(0, event.lastIndexOf('.'));
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
