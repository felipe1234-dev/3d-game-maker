import { useRef, useEffect } from "react";

export default function useInterval(
    callback: (id: NodeJS.Timer) => void, 
    delay: number,
    triggers: any[]
) {
    const savedCallback = useRef<Function>((id: NodeJS.Timer) => {
        clearInterval(id);
    });

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        const id = setInterval(() => {
            savedCallback.current(id);
        }, delay);
        return () => clearInterval(id);
    }, [delay, ...triggers]);
};