import React, { useState, useCallback } from "react";
import { Drawer, DrawerProps } from "@mui/material";

interface ResizableDrawerProps {
    defaultDrawerWidth?: number;
    minDrawerWidth?: number;
    maxDrawerWidth?: number;
    Dragger: (props: {
        onMouseDown: () => void,
        style: React.CSSProperties
    }) => JSX.Element
}

function ResizableDrawer(props: ResizableDrawerProps & DrawerProps) {
    const {
        defaultDrawerWidth = 240,
        minDrawerWidth = 50,
        maxDrawerWidth = 1000,
        Dragger,
        anchor,
        PaperProps,
        children,
        ...drawerProps
    } = props;
    const [drawerWidth, setDrawerWidth] = useState<number>(defaultDrawerWidth);

    const onMouseDown = () => {
        document.addEventListener("mouseup", onMouseUp, true);
        document.addEventListener("mousemove", onMouseMove, true);
    };

    const onMouseUp = () => {
        document.removeEventListener("mouseup", onMouseUp, true);
        document.removeEventListener("mousemove", onMouseMove, true);
    };

    const onMouseMove = useCallback((evt: MouseEvent) => {
        const newWidth = anchor === "left" 
            ? evt.clientX - document.body.offsetLeft
            : window.innerWidth - evt.clientX;

        if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
            setDrawerWidth(newWidth);
        }
    }, []);

    return (
        <Drawer
            variant="permanent"
            anchor={anchor}
            PaperProps={{ 
                ...PaperProps,
                style: { 
                    width: drawerWidth,
                    ...PaperProps?.style
                },
            }}
            {...drawerProps}
        >
            <Dragger 
                onMouseDown={onMouseDown}
                style={{                
                    width: "5px",
                    cursor: "ew-resize",
                    padding: "4px 0 0",
                    borderTop: "1px solid #ddd",
                    position: "absolute",
                    top: 0,
                    [anchor === "left" ? "right" : "left"]: 0,
                    bottom: 0,
                    zIndex: 100,
                    backgroundColor: "#f4f7f9"
                }}
            />
            {children}
        </Drawer>
    );
}

export default ResizableDrawer;
export type { ResizableDrawerProps };