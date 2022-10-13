/**
 * Generates a unique number ID.
 */
function generateID(): number {
    return Math.round(new Date().valueOf() * Math.random());
}

export default generateID;