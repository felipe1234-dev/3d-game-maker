import React, { useEffect, useContext, createContext, useState } from "react";

import { Editor } from "@local/classes";
import { GameContext } from "@local/contexts";

const EditorContext = createContext<Editor.Core | undefined>(undefined);

function EditorProvider(props: { children: React.ReactNode }) {
    const [editor, setEditor] = useState<Editor.Core>();
    const game = useContext(GameContext);

    useEffect(() => {
        if (!game) {
            return;
        }

        setEditor(new Editor.Core(game));
    }, [game]);

    return (
        <EditorContext.Provider value={editor}>
            {props.children}
        </EditorContext.Provider>
    );
}

function useEditor() {
    const context = useContext(EditorContext);

    if (!context) {
        throw new Error("useEditor must be used within a EditorProvider");
    }

    return context;
}

export { useEditor, EditorProvider, EditorContext };