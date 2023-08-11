import { atom } from 'recoil';

const authAtom = atom({
  key: 'auth',
  default: JSON.parse(localStorage.getItem('user') as string)
});

const userAtom = atom({
  key: 'user',
  default: null
});

export {
  authAtom,
  userAtom
};
