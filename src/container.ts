export const defaultContainer: { get<T>(someClass: { new (...args: any[]): T }|Function): T } = new (class {

    private instances: { type: Function, object: any }[] = [];

    get<T>(someClass: { new (...args: any[]): T }): T {

        let instance = this.instances.find(instance => instance.type === someClass);
        if (!instance) {
            instance = { type: someClass, object: new someClass() };
            this.instances.push(instance);
        }

        return instance.object;
    }
})();

export function getFromContainer<T>(someClass: { new (...args: any[]): T }|Function): T {
    return defaultContainer.get<T>(someClass);
}