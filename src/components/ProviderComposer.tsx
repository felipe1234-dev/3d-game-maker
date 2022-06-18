import React from "react";

interface ProviderComposerProps {
    providers: Array<Function>, 
    children: React.ReactNode
}

function ProviderComposer(props: ProviderComposerProps) {
    return (
        <>
            {props.providers.reduceRight((otherProviders, Provider) => (
                <Provider>{otherProviders}</Provider>
            ), props.children)}
        </>
    );
}

export default ProviderComposer;
export type { ProviderComposerProps };