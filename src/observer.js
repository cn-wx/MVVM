class Observer {
    constructor(data) {
        this.observe(data);
    }
    observe(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
            this.observe(data[key]);
        });
    }
    defineReactive(obj, key, value) {
        this.observe()
        let that = this;
        let dep = new Dep();
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                Dep.target && dep.addSubscribe(Dep.target);
                return value;
            },
            set(newValue) {
                if (newValue != value) {
                    // observe if is an object
                    that.observe(newValue);
                    value = newValue;
                    dep.notify();
                }
            }
        });
    }
}
