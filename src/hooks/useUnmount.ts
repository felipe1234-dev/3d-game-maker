import { useEffect, useRef } from "react";

function useUnmount(callback: Function): void {
    const callbackRef = useRef(callback);
    callbackRef.current = callback;
  
    useEffect(() => () => callbackRef.current(), []);
};

export default useUnmount;