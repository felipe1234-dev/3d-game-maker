import { Game, Editor, Utils } from "./classes";

declare global {
    interface Window {
        Game: typeof Game;
        Editor: typeof Editor;
        Utils: typeof Utils;
    }
}