import { Game } from "@local/classes";
import { applyObject3DJSON } from "@local/classes/Game/utils/private";

describe("Testing private utils", () => {
    test("applyObject3DJSON.function", () => {
        const object = new Game.Mesh();

        object.position.x = 10;
        object.position.y = -1.0;
        object.position.z = -2.0;

        object.rotation.x = 3.1;
        object.rotation.y = -1.0;
        object.rotation.z = -2.0;

        object.updateMatrix();
        object.updateMatrixWorld();

        object.receiveShadow = true;
        object.castShadow = true;
        object.visible = false;
        object.frustumCulled = true;
        object.renderOrder = 10;
        object.userData = {
            test: "yo"
        };

        const json = object.toJSON({
            geometries: {},
            materials: {},
            textures: {},
            images: {},
            bodies: {}
        });

        const cmpObject = new Game.Mesh();
        applyObject3DJSON(cmpObject, json);

        {
            const { x: cx, y: cy, z: cz } = cmpObject.position;
            const { x: ox, y: oy, z: oz } = object.position;

            expect(
                [Math.round(cx), Math.round(cy), Math.round(cz)]
            ).toEqual(
                [Math.round(ox), Math.round(oy), Math.round(oz)]
            );
        }

        {
            const { x: cx, y: cy, z: cz } = cmpObject.rotation;
            const { x: ox, y: oy, z: oz } = object.rotation;

            expect(
                [Math.round(cx), Math.round(cy), Math.round(cz)]
            ).toEqual(
                [Math.round(ox), Math.round(oy), Math.round(oz)]
            );
        }

        expect(cmpObject.receiveShadow).toBe(object.receiveShadow);
        expect(cmpObject.castShadow).toBe(object.castShadow);
        expect(cmpObject.visible).toBe(object.visible);
        expect(cmpObject.frustumCulled).toBe(object.frustumCulled);
        expect(cmpObject.renderOrder).toBe(object.renderOrder);
        expect(cmpObject.userData).toEqual(object.userData);
    });
});