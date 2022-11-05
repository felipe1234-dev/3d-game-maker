import React, { useState, useContext, createContext } from "react";

import { Editor } from "@local/classes";

interface EditorValue {
    editor: Editor.Core | undefined;
    setEditor: (editor: Editor.Core | undefined) => void;
}

const EditorContext = createContext<EditorValue | undefined>(undefined);

function EditorProvider(props: { children: React.ReactNode }) {
    const [editor, setEditor] = useState<Editor.Core>();

    return (
        <EditorContext.Provider value={{ editor, setEditor }}>
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