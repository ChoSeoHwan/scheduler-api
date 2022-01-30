import { Constructor } from '~/types/cheat';

const isWarningSymbol = Symbol('_isWarning');

/**
 * Warning decoration
 *
 * @param {Constructor} constructor 적용시킬 class
 * @returns {Constructor} warning 적용된 class
 */
const Warning = <T extends Constructor>(constructor: T) => {
    return class extends constructor {
        [isWarningSymbol] = true;
    };
};

/**
 * warning 객체인지 확인
 *
 * @param {unknown} item 확인할 item
 * @returns {boolean} warning 여부
 */
export const isWarning = (item: unknown): boolean =>
    Object.prototype.hasOwnProperty.bind(item)(isWarningSymbol);

export default Warning;
