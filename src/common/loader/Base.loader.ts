import DataLoader, { BatchLoadFn, Options } from 'dataloader';

export abstract class BaseLoader<Key, Value, CacheKey = Key> {
    private dataloader: DataLoader<Key, Value, CacheKey>;

    protected constructor() {
        this.dataloader = new DataLoader<Key, Value, CacheKey>(
            (keys) => this.batch(keys),
            this.options
        );
    }

    /**
     * dataloader options
     *
     * @protected
     */
    protected options: Options<Key, Value, CacheKey> = {
        cache: false
    };

    /**
     * batch function
     *
     * @param {Parameters<BatchLoadFn<Key, Value>>} args arguments
     * @protected
     * @returns {ReturnType<BatchLoadFn<Key, Value>>}
     */
    protected abstract batch(
        ...args: Parameters<BatchLoadFn<Key, Value>>
    ): ReturnType<BatchLoadFn<Key, Value>>;

    // dataloader 함수 정의
    load(key: Key) {
        return this.dataloader.load(key);
    }

    loadMany(key: ArrayLike<Key>) {
        return this.dataloader.loadMany(key);
    }

    clear(key: Key) {
        return this.dataloader.clear(key);
    }

    clearAll() {
        return this.dataloader.clearAll();
    }

    prime(key: Key, value: Value | Error) {
        return this.dataloader.prime(key, value);
    }
}
