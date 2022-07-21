function setProperty<T>(path: string, value: T, target: object): void {
    eval(`target.${path} = value`);
}

export default setProperty;