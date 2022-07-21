function getProperty<T>(path: string, target: object): T {
    const result = eval(`target.${path}`);

    return result;
}

export default getProperty;