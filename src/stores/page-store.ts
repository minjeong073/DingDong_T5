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

export interface QuestionDataType {
  _id: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  author: string;
}

export const QuestionData = atom<QuestionDataType[]>({
  key: "QuestionData",
  default: [],
});
