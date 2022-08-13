import React from "react";

interface ComposerProps {
    components: Array<Function>, 
    children?: React.ReactNode
}

function Composer(props: ComposerProps) {
    return (
        <>
            {props.components.reduceRight((otherComponents, Component) => (
                <Component>{otherComponents}</Component>
            ), props.children)}
        </>
    );
}

export default Composer;
export type { ComposerProps };