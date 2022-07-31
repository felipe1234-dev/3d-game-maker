import { FieldPath, OrderByDirection, WhereFilterOp } from "firebase/firestore";

export type Severity = "error" | "warning" | "info" | "success";

export type WhereClasule = readonly [FieldPath | string, WhereFilterOp, unknown];

export type OrderByClasule = readonly [FieldPath | string, OrderByDirection];