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

    const onResize = () => {
        if (!editor || !game) return;

        editor.camera.aspect =
            game.renderer.canvas.offsetWidth /
            game.renderer.canvas.offsetHeight;
        editor.camera.updateProjectionMatrix();
    };

    const onPointerMove = () => {
        const intersections = editor?.transformControls.intersects || [];
        setHideTooltip(intersections.length < 1);
    };

    useEffect(() => {
        console.log("Viewport");

        if (
            !containerEl ||
            containerEl.innerHTML.length !== 0 ||

            !game ||
            !game.currentScene ||

            !editor
        ) return;

        editor.camera.position.set(0, 10, 10);
        editor.orbitControls.update();

        game.renderer.container = containerEl;

        window.addEventListener(
            "resize",
            onResize
        );
        new ResizeObserver(onResize).observe(containerEl);

        game.renderer.canvas.addEventListener(
            "pointermove",
            onPointerMove
        );

        game.renderer.physicsEnabled = false;

        game.renderer.start(
            () => {
            },
            game.currentScene,
            editor.camera
        );

        console.log(editor);
        console.log(game);
    }, [containerEl, editor, game]);

    useUnmount(() => {
        window.removeEventListener(
            "resize",
            onResize
        );
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