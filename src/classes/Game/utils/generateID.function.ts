/**
 * Generates a unique number ID.
 */
function generateID(): number {
    return (
        Math.round(
            Number(`${new Date().getTime()}`.slice(-5)) * Math.random()
        )
    );
}

export default generateID;