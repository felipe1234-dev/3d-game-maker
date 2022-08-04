import { 
    AlertProvider, 
    GameProvider,
    EditorProvider,
    UserProvider
} from "@local/contexts";
import { ProviderComposer } from "@local/components";

function App(props: { children: React.ReactNode }) {
    return (
        <ProviderComposer providers={[
            UserProvider,
            AlertProvider,
            GameProvider,
            EditorProvider
        ]}>
            {props.children}
        </ProviderComposer>
    );
}

export default App;