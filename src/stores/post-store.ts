import { atom, selector } from 'recoil';

export interface ArticleDataType {
  _id: string;
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  author: string;
  hashtag: string[];
  votes: number;
  answers: number;
  views: number;
}

export const articleState = atom<ArticleDataType[]>({
  key: "articleState",
  default: [],
});

// 전체 글 리스트
export const articleListState = selector({
  key: 'articleListState',
  get: ({get}) => (articleState),
  set: ({set}, newValue) => set(articleState, newValue),
});