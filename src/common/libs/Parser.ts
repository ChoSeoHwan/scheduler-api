import { boolean } from 'boolean';

class Parser {
    /**
     * string 으로 변환
     *
     * @param {unknown} item 변환할 item
     * @param {string} defaultValue 변환 실패 시 기본 값
     * @returns {string} 변환된 값
     */
    static string(item: unknown, defaultValue = ''): string {
        switch (typeof item) {
            case 'string':
                return item;

            case 'object':
            case 'number':
            case 'boolean':
            case 'symbol':
            case 'bigint':
            case 'function':
                if (item === null) return defaultValue;

                return item.toString();

            case 'undefined':
            default:
                return defaultValue;
        }
    }

    /**
     * int 로 변환
     *
     * @param {unknown} item 변환할 값
     * @param {number} defaultValue 기본 값
     * @returns {number} 변환된 값
     */
    static int(item: unknown, defaultValue = 0): number {
        switch (typeof item) {
            case 'number':
            case 'bigint':
                return Math.floor(Number(item));

            case 'string': {
                const result = parseInt(item, 10);
                return isNaN(result) ? defaultValue : result;
            }

            default:
                return defaultValue;
        }
    }

    /**
     * number 로 변환
     *
     * @param {unknown} item 변환할 값
     * @param {number} defaultValue 변환 실패 시 기본 값
     * @returns {number} 변환된 값
     */
    static number(item: unknown, defaultValue = 0): number {
        switch (typeof item) {
            case 'number':
            case 'bigint':
                return Number(item);

            case 'string': {
                const result = Number(item);
                return isNaN(result) ? defaultValue : result;
            }

            default:
                return defaultValue;
        }
    }

    /**
     * boolean 으로 변환
     *
     * @param {unknown} item 변환될 값
     * @returns {boolean} 변환된 값
     */
    static boolean(item: unknown): boolean {
        return boolean(item);
    }
}

export default Parser;
