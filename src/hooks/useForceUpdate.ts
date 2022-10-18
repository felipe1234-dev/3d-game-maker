import { useState, useCallback } from "react";

function useForceUpdate() {
    const [count, setCount] = useState(0);

    const forceUpdate = useCallback(() => {
        setCount(count => count + 1);
    }, []);

    return { forceUpdate, updates: count };
}

export default useForceUpdate;