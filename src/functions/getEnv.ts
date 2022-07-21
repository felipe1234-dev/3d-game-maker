function getEnv(key: string): string|undefined {
    key = key.toUpperCase();
    key = key.trim();
    key = key.replace(/\s+/g, " ");
    key = key.replace(/\s/g, "_");
    
    return process.env[`REACT_APP_${key}`];
}

export default getEnv;