import React from "react";
import { ScreenProvider } from "./Screen";

const ProviderComposer = (
    props: {
        providers: Array<Function>, 
        children: React.ReactNode
    }
) => (
    <>
        {props.providers.reduceRight((otherProviders, Provider) => (
            <Provider>{otherProviders}</Provider>
        ), props.children)}
    </>
)

const MasterProvider = (props: { children: React.ReactNode }) => (
    <ProviderComposer providers={[
        ScreenProvider
    ]}>
        {props.children}
    </ProviderComposer>
)

export { MasterProvider };