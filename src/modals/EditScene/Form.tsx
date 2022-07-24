import React from "react";
import { EditorContext } from "@local/contexts";

function Form() {
    const editor = React.useContext(EditorContext);
    const game = editor ? editor.game : null;

    return (
        <></>
    );
}

export default Form;