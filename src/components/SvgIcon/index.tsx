import React from "react";
import "@local/styles/components/SvgIcon.scss";

interface SvgIconProps {
    className?: string;
    style?: React.CSSProperties;
    color?: string;
    Svg: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string | undefined;
    }>;
}

function SvgIcon(props: SvgIconProps) {
    return (
        <props.Svg
            className={`SvgIcon ${props.className || ""}`.trim()}
            style={{
                ...props.style,
                ["--svg-color" as any]: props.color || undefined
            }}
        />
    );
}

export default SvgIcon;