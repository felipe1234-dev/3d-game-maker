/**
 * Generates a unique number ID.
 */
function generateID(): number {
    return new Date().valueOf();
}

export default generateID;