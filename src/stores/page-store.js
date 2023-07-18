import { atom } from "recoil";

export const StartState = atom({
  key: "StartState",
  default: 1,
});

export const CurrentState = atom({
  key: "CurrentState",
  default: 1,
});

export const ItemsState = atom({
  key: "ItemsState",
  default: 5,
});