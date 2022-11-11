import { ReactComponent as Tetris } from "@local/images/tetris.svg";
import { SvgIcon } from "@local/components";

function Wallpaper() {
    return (
        <section className="Editor-wallpaper">
            <SvgIcon Svg={Tetris} />
        </section>
    );
}

export default Wallpaper;