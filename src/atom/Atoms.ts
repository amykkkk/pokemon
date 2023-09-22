import { atom } from "recoil";

export const storageState = atom<any>({
  key: "storageState",
  default: undefined,
  effects: [
    ({ setSelf, onSet }) => {
      // setSelf: atom 값을 설정 혹은 재설정
      const savedData = localStorage.getItem("item");
      if (savedData) setSelf(JSON.parse(savedData));

      // atom 변화가 감지될때 스토리지에 저장
      onSet((newValue, _, isReset) => {
        isReset
          ? localStorage.removeItem("item")
          : localStorage.setItem("item", JSON.stringify(newValue));
      });
    },
  ],
});
