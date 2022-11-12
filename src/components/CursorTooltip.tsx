import React, { useState } from "react";
import "@local/styles/components/CursorTooltip.scss";

interface CursorTooltipProps {
    id?: string;
    className?: string;
    style?: React.CSSProperties;
    title: string;
    hide?: boolean;
    offsetX?: number;
    offsetY?: number;
    children: (props?: {
        onMouseMove:(evt: React.MouseEvent) => void;
    }) => React.ReactElement<any, any>;
}

function CursorTooltip(props: CursorTooltipProps) {
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const { 
        children, 
        hide, 
        id,
        className = "",
        style,
        title,

        offsetX = 0,
        offsetY = 0
    } = props;

    return (
        <>
            {!hide && (
                <div
                    id={id}
                    className={`CursorTooltip ${className}`.trim()}
                    style={{
                        ...style,
                        top: tooltipPos.y,
                        left: tooltipPos.x
                    }}
                >
                    {title}
                </div>
            )}

            {children({
                onMouseMove: (evt: React.MouseEvent) => {
                    const { pageX: x, pageY: y } = evt;
                    setTooltipPos({ 
                        x: x + offsetX,
                        y: y + offsetY
                    });
                }
            })}
        </>
    );
}

export default CursorTooltip;
export type { CursorTooltipProps };