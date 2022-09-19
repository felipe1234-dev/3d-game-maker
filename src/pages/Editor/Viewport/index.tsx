import { useEffect, useState } from "react";

import { useEditor, useGame } from "@local/contexts";
import { CursorTooltip } from "@local/components";
import { t } from "@local/i18n";

function Viewport() {
    const [hideTooltip, setHideTooltip] = useState(true);
    const [containerEl, setContainerEl] = useState<HTMLElement | null>(null);

    const editor = useEditor();
    const game = useGame();

    useEffect(() => {
        const container = containerEl;

        if (
            container &&
            container.innerHTML.length === 0 &&
            game.currentScene
        ) {
            editor.camera.position.set(0, 10, 10);
            editor.orbitControls.update();

            game.renderer.container = container;

            const onResize = () => {
                editor.camera.aspect =
                    game.renderer.canvas.offsetWidth /
                    game.renderer.canvas.offsetHeight;
                editor.camera.updateProjectionMatrix();
            };

            window.addEventListener("resize", onResize);
            new ResizeObserver(onResize).observe(container);

            game.renderer.canvas.addEventListener("pointermove", () => {
                const intersections = editor.transformControls.intersects;
                setHideTooltip(intersections.length < 1);
            });

            game.renderer.startAnimation(
                () => {},
                game.currentScene,
                editor.camera
            );

            console.log(editor);
            console.log(game);
        }
    }, [containerEl, editor, game]);

    const intersections = editor.transformControls.intersects || [];
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