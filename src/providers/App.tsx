import { AlertProvider } from "@local/contexts";
import { ProviderComposer } from "@local/components";

function App(props: { children: React.ReactNode }) {
    return (
        <ProviderComposer providers={[
            AlertProvider
        ]}>
            {props.children}
        </ProviderComposer>
    );
}

export default App;