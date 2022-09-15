import * as CANNON from "cannon-es";

class SphereShape extends CANNON.Sphere {
    public scale: CANNON.Vec3;
    
    constructor(radius: number, scale: CANNON.Vec3 = new CANNON.Vec3(1, 1, 1)) {
        super(radius);

        if (scale.x < 0 || scale.y < 0 || scale.z < 0) {
            throw new Error("The sphere scales cannot be negative.");
        }

        this.scale = scale;

        this.updateBoundingSphereRadius();
    }

    public override calculateLocalInertia(mass: number, target?: CANNON.Vec3): CANNON.Vec3 {
        if (target === void 0) {
            target = new CANNON.Vec3();
        }
    
        let isEllipse = false;

        if (this.scale.x !== this.scale.y) {
            isEllipse = true;
        }

        let I = 0;

        if (isEllipse) {
            const A = this.radius * this.scale.x;
            const B = this.radius * this.scale.y;
            I = mass * (A*A + B*B)/4;
        } else {
            I = 2.0 * mass * this.radius * this.radius / 5.0;
        }

        target.x = I;
        target.y = I;
        target.z = I;

        return target;
    }

    public override volume(): number {
        const A = this.radius * this.scale.x;
        const B = this.radius * this.scale.y;
        const C = this.radius * this.scale.z;

        return 4/3 * Math.PI * A * B * C;
    }

    public override calculateWorldAABB(
        pos: CANNON.Vec3, 
        quat: CANNON.Quaternion, 
        min: CANNON.Vec3, 
        max: CANNON.Vec3
    ): void {
        const r = this.radius;
        const s = this.scale;
        const axes = ["x", "y", "z"] as const;
    
        for (const ax of axes) {
            min[ax] = pos[ax] - s[ax]*r;
            max[ax] = pos[ax] + s[ax]*r;
        }
    }

    public override updateBoundingSphereRadius(): void {
        const r = this.radius;
        const { x: sx, y: sy, z: sz } = this.scale;

        this.boundingSphereRadius = Math.max(sx*r, sy*r, sz*r);
    }
}

export default SphereShape;