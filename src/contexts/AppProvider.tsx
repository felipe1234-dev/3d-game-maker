import { ProviderComposer } from "@local/components";

function AppProvider(props: { children: React.ReactNode }) {
    return (
        <ProviderComposer providers={[
            
        ]}>
            {props.children}
        </ProviderComposer>
    );
}

export default AppProvider;