import { atom } from 'recoil';

const formValue = atom({
  key: 'formValue',
  default: { value: '', idChangeableTask: '' },
});

export { formValue };
