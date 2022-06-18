import React from "react";

import { Editor } from "@local/classes";
import { GameContext } from "./index";

const EditorContext = React.createContext<Editor.Core | undefined>(undefined);

function EditorProvider(props: { children: React.ReactNode }) {
    const [editor, setEditor] = React.useState<Editor.Core>();
    const game = React.useContext(GameContext);
    
    React.useEffect(() => {
        if (game) {
            setEditor(new Editor.Core(game));
        }
    }, [game]);
    
    return (
        <EditorContext.Provider value={editor}>
            {props.children}
        </EditorContext.Provider>
    );
}

export { EditorContext, EditorProvider };