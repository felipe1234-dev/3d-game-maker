import React from "react";
import { Tooltip, TooltipProps } from "@mui/material";

interface HelperProps extends Omit<TooltipProps, "title"> {
    text?: string,
    children: React.ReactElement
}

function Helper(props: HelperProps) {
    const { text, children, ...tooltipProps } = props;
    
    return text && text?.length > 0 ? (
        <Tooltip title={text} {...tooltipProps}>
            {children}
        </Tooltip>
    ) : children;
}

export default Helper;
export type { HelperProps };