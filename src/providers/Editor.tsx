import { GameProvider, EditorProvider } from "@local/contexts";
import { ProviderComposer } from "@local/components";

function Editor(props: { children: React.ReactNode }) {
    return (
        <ProviderComposer providers={[
            GameProvider,
            EditorProvider
        ]}>
            {props.children}
        </ProviderComposer>
    );
}

export default Editor;