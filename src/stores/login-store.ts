import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

export const authAtom = atom({
  key: 'auth',
  default: JSON.parse(localStorage.getItem('user') as string),
});

export const userAtom = atom({
  key: 'user',
  default: null,
});

const { persistAtom } = recoilPersist();

export const LoginState = atom({
  key: 'LoginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
