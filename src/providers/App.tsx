import { 
    AlertProvider, 
    GameProvider,
    EditorProvider,
    FirebaseProvider,
    UserProvider
} from "@local/contexts";
import { ProviderComposer } from "@local/components";

function App(props: { children: React.ReactNode }) {
    return (
        <ProviderComposer providers={[
            FirebaseProvider,
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