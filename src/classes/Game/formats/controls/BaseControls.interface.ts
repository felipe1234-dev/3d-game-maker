import { isControls, Controls } from "./Controls.interface";

interface BaseControls extends Controls { }

function isBaseControls(json: any): json is BaseControls {
    return isControls(json);
}

export { isBaseControls };
export type { BaseControls };