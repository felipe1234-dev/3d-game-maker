import { EditorPage } from "@local/pages";
import { GameProvider, EditorProvider } from "@local/contexts";

import "./styles/reset.css";
import "./styles/base.css";

function App() {
    return (
        <GameProvider>
            <EditorProvider>
                <EditorPage />
            </EditorProvider>
        </GameProvider>
    );
}

export default App;