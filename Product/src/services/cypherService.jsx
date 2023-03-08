import { EncryptStorage } from "encrypt-storage";

const SECRET_KEY = "KEY-9854217";
// Passing the key and value

const encryptLocalStorage = new EncryptStorage(SECRET_KEY, {
  storageType: "localStorage",
});
const encryptSessionStorage = new EncryptStorage(SECRET_KEY, {
  storageType: "sessionStorage",
});

const setSessionStorage = (key, value) => {
  sessionStorage.setItem(key, value);
};
const getSessionStorage = (key) => {
  return sessionStorage.getItem(key);
};

export const cypherService = {
  setSessionStorage,
  getSessionStorage,
  encryptLocalStorage,
  encryptSessionStorage
};
