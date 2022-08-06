import { 
    AlertProvider, 
    GameProvider,
    EditorProvider
} from "@local/contexts";
import { ProviderComposer } from "@local/components";

function App(props: { children: React.ReactNode }) {
    return (
        <ProviderComposer providers={[
            AlertProvider,
            GameProvider,
            EditorProvider
        ]}>
            {props.children}
        </ProviderComposer>
    );
}

export default App;