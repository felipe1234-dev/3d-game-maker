const FirstPerson = 1;
const SecondPerson = 2;
const ThirdPerson = 3;
type Person = typeof FirstPerson | typeof SecondPerson | typeof ThirdPerson;

export { default as PointerLockControls } from "./PointerLockControls.class";
export type { Person };
export {
    FirstPerson,
    SecondPerson,
    ThirdPerson
};