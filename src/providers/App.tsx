import { AlertProvider, I18nProvider } from "@local/contexts";
import { ProviderComposer } from "@local/components";

function App(props: { children: React.ReactNode }) {
    return (
        <ProviderComposer providers={[
            I18nProvider,
            AlertProvider
        ]}>
            {props.children}
        </ProviderComposer>
    );
}

export default App;