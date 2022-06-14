import React from "react";

const ProviderComposer = (
    props: {
        providers: Array<Function>, 
        children: React.ReactNode
    }
) => (
    <>
        {props.providers.reduceRight((acc, Provider) => (
            <Provider>{acc}</Provider>
        ), props.children)}
    </>
)

const MasterProvider = (props: { children: React.ReactNode }) => (
    <ProviderComposer providers={[
    ]}>
        {props.children}
    </ProviderComposer>
)

export { MasterProvider };