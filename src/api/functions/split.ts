const split = (text: string) => (
    text.replace(/[-_\s]/g, " ").replace(/\s+/g, " ").split(" ")
);

export default split;