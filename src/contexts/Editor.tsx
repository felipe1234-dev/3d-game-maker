import React, { useEffect, useContext, createContext, useState } from "react";

import { Editor } from "@local/classes";
import { GameContext } from "./index";

const EditorContext = createContext<Editor.Core | undefined>(undefined);

function EditorProvider(props: { children: React.ReactNode }) {
    const [editor, setEditor] = useState<Editor.Core>();
    const game = useContext(GameContext);
    
    useEffect(() => {
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