import React from "react";

interface PressableProps {
    children: React.ReactNode,
    component?: React.ElementType,
    onMousePress: () => void,
    onMouseRelease?: () => void,
    ms?: number 
}

function Pressable(props: PressableProps) {
    const { 
        component, 
        onMousePress, 
        onMouseRelease,
        children,
        ms,
        ...rest
    } = props;
    
    const intervalRef = React.useRef<NodeJS.Timer>();
    const Component = component ?? "div";

    React.useEffect(()=> {
      	return () => onStopPressing(); // When Pressable is unmounted we should stop the pressing.
    }, []);

    const onStartPressing = () => {
        if (intervalRef.current) {
            return;
        }
        
        intervalRef.current = setInterval(() => {
            onMousePress();
        }, ms ?? 100);
    };

    const onStopPressing = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = undefined;
            
            if (onMouseRelease) {
                onMouseRelease();
            }
        }
    };
    
    return (
        <Component
            onMouseDown={onStartPressing}
            onTouchStart={onStartPressing}
            onMouseUp={onStopPressing}
            onMouseLeave={onStopPressing}
            onTouchEnd={onStopPressing}
            {...rest}
        >
            {children}
        </Component>
    );
}

export default Pressable;
export type { PressableProps };