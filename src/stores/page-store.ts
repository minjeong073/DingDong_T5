import { atom, selector } from 'recoil';

export const StartState = atom({
  key: 'StartState',
  default: 1,
});

export const CurrentState = atom({
  key: 'CurrentState',
  default: 1,
});

export const ItemsState = atom({
  key: 'ItemsState',
  default: 5,
});

export interface QuestionDataType {
  _id?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  //author: string;
  votes?: number;
  answers?: number;
  views?: number;
  saves?: number;
  comments?: number;
  userId: string;
  hashtags: string[];
  isDeleted: boolean;
}

const defaultQuestionData: QuestionDataType[] = [
  {
    _id: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
    votes: 0,
    answers: 0,
    views: 0,
    saves: 0,
    comments: 0,
    userId: '',
    hashtags: [],
    isDeleted: false,
  },
];

export const QuestionData = atom<QuestionDataType[]>({
  key: 'QuestionData',
  default: defaultQuestionData,
});

// 전체 글 리스트
export const QuestionListState = selector({
  key: 'QuestionListState',
  get: ({ get }) => QuestionData,
  set: ({ set }, newValue) => set(QuestionData, newValue),
});
