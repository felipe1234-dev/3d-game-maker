import { useState, useEffect } from "react";

import { useGame } from "@local/contexts";

function Viewport() {
    const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
    const { game } = useGame();

    useEffect(() => {
        if (
            !containerEl ||
            containerEl.innerHTML.length !== 0 ||

            !game ||
            !game.current.scene ||
            !game.current.camera
        ) return;

        game.start(containerEl);
    }, [containerEl, game]);

    return (
        <section
            ref={el => setContainerEl(el)}
            className="Editor-viewport"
        />
    );
}

export default Viewport;