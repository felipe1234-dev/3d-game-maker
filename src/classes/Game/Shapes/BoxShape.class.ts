/* import * as CANNON from "cannon-es";

class BoxShape extends CANNON.Box {
    public scale: CANNON.Vec3;

    constructor(halfExtents: CANNON.Vec3, scale: CANNON.Vec3) {
        super(halfExtents);

        if (scale.x < 0 || scale.y < 0 || scale.z < 0) {
            throw new Error("The box scales cannot be negative.");
        }

        this.scale = scale;
    }

    public override updateConvexPolyhedronRepresentation(): void {
        const oldHalfExtents = this.halfExtents.clone();
        
        this.halfExtents.x *= this.scale.x;
        this.halfExtents.y *= this.scale.y;
        this.halfExtents.z *= this.scale.z;

        super.updateConvexPolyhedronRepresentation();

        this.halfExtents.copy(oldHalfExtents);
    }

    public override calculateLocalInertia(mass: number, target?: CANNON.Vec3): CANNON.Vec3 {
        if (target === void 0) {
            target = new CANNON.Vec3();
        }

        const { x: hx, y: hy, z: hz } = this.halfExtents
        const { x: sx, y: sy, z: sz } = this.scale;

        const scaled = new CANNON.Vec3(hx*sx, hy*sy, hz*sz);

        CANNON.Box.calculateInertia(scaled, mass, target);

        return target;
    }
    
    getSideNormals(sixTargetVectors, quat) {
        const sides = sixTargetVectors;
        const ex = this.halfExtents;
        sides[0].set(ex.x, 0, 0);
        sides[1].set(0, ex.y, 0);
        sides[2].set(0, 0, ex.z);
        sides[3].set(-ex.x, 0, 0);
        sides[4].set(0, -ex.y, 0);
        sides[5].set(0, 0, -ex.z);

        if (quat !== undefined) {
            for (let i = 0; i !== sides.length; i++) {
                quat.vmult(sides[i], sides[i]);
            }
        }

        return sides;
    }

    public override volume(): number {
        return 8.0 * (this.halfExtents.x * this.scale.x) * (this.halfExtents.y * this.scale.y) * (this.halfExtents.z * this.scale.z);
    }

    public override updateBoundingSphereRadius(): void {
        const { x: hx, y: hy, z: hz } = this.halfExtents
        const { x: sx, y: sy, z: sz } = this.scale;

        const scaled = new CANNON.Vec3(hx*sx, hy*sy, hz*sz);

        this.boundingSphereRadius = scaled.length();
    }

    forEachWorldCorner(pos, quat, callback) {
        const e = this.halfExtents;
        const corners = [[e.x, e.y, e.z], [-e.x, e.y, e.z], [-e.x, -e.y, e.z], [-e.x, -e.y, -e.z], [e.x, -e.y, -e.z], [e.x, e.y, -e.z], [-e.x, e.y, -e.z], [e.x, -e.y, e.z]];

        for (let i = 0; i < corners.length; i++) {
            worldCornerTempPos.set(corners[i][0], corners[i][1], corners[i][2]);
            quat.vmult(worldCornerTempPos, worldCornerTempPos);
            pos.vadd(worldCornerTempPos, worldCornerTempPos);
            callback(worldCornerTempPos.x, worldCornerTempPos.y, worldCornerTempPos.z);
        }
    }


    calculateWorldAABB(pos, quat, min, max) {
        const e = this.halfExtents;
        worldCornersTemp[0].set(e.x, e.y, e.z);
        worldCornersTemp[1].set(-e.x, e.y, e.z);
        worldCornersTemp[2].set(-e.x, -e.y, e.z);
        worldCornersTemp[3].set(-e.x, -e.y, -e.z);
        worldCornersTemp[4].set(e.x, -e.y, -e.z);
        worldCornersTemp[5].set(e.x, e.y, -e.z);
        worldCornersTemp[6].set(-e.x, e.y, -e.z);
        worldCornersTemp[7].set(e.x, -e.y, e.z);
        const wc = worldCornersTemp[0];
        quat.vmult(wc, wc);
        pos.vadd(wc, wc);
        max.copy(wc);
        min.copy(wc);

        for (let i = 1; i < 8; i++) {
            const wc = worldCornersTemp[i];
            quat.vmult(wc, wc);
            pos.vadd(wc, wc);
            const x = wc.x;
            const y = wc.y;
            const z = wc.z;

            if (x > max.x) {
                max.x = x;
            }

            if (y > max.y) {
                max.y = y;
            }

            if (z > max.z) {
                max.z = z;
            }

            if (x < min.x) {
                min.x = x;
            }

            if (y < min.y) {
                min.y = y;
            }

            if (z < min.z) {
                min.z = z;
            }
        } // Get each axis max
        // min.set(Infinity,Infinity,Infinity);
        // max.set(-Infinity,-Infinity,-Infinity);
        // this.forEachWorldCorner(pos,quat,function(x,y,z){
        //     if(x > max.x){
        //         max.x = x;
        //     }
        //     if(y > max.y){
        //         max.y = y;
        //     }
        //     if(z > max.z){
        //         max.z = z;
        //     }
        //     if(x < min.x){
        //         min.x = x;
        //     }
        //     if(y < min.y){
        //         min.y = y;
        //     }
        //     if(z < min.z){
        //         min.z = z;
        //     }
        // });

    }
}

export BoxShape; */
export {};