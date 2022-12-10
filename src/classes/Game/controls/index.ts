const FirstPerson = 1;
const SecondPerson = 2;
const ThirdPerson = 3;
type Person = typeof FirstPerson | typeof SecondPerson | typeof ThirdPerson;

export { default as PointerLockControls } from "./PointerLockControls.class";
export { default as ClassicalControls } from "./ClassicalControls.class";
export { default as RotationControls } from "./RotationControls.class";

export type { Person };
export {
    FirstPerson,
    SecondPerson,
    ThirdPerson
};