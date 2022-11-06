import { useEffect, useState } from "react";

import { useEditor, useGame } from "@local/contexts";
import { CursorTooltip } from "@local/components";
import { t } from "@local/i18n";
import { useUnmount } from "@local/hooks";

function Viewport() {
    const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);
    const [hideTooltip, setHideTooltip] = useState(true);

    const { editor } = useEditor();
    const { game } = useGame();

    const onPointerMove = () => {
        const intersections = editor?.transformControls.intersects || [];
        setHideTooltip(intersections.length < 1);
    };

    useEffect(() => {
        if (
            !containerEl ||
            containerEl.innerHTML.length !== 0 ||

            !game ||
            !game.current.scene ||

            !editor
        ) return;

        editor.start(containerEl);

        game.renderer.canvas.addEventListener(
            "pointermove",
            onPointerMove
        );

        console.log(editor);
        console.log(game);
    }, [containerEl, editor, game]);

    useUnmount(() => {
        game?.renderer.canvas.removeEventListener(
            "pointermove",
            onPointerMove
        );
    });

    const intersections = editor?.transformControls.intersects || [];
    const { object } = intersections[0] || {};

    return (
        <CursorTooltip
            title={object?.name || t("No name")}
            hide={hideTooltip}
            offsetX={30}
            offsetY={-10}
        >
            {props => (
                <section
                    ref={el => setContainerEl(el)}
                    className="Editor-viewport"
                    {...props}
                />
            )}
        </CursorTooltip>
    );
}

export default Viewport;