import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("1234567890", 8);

const generateId = () => {
  return Number(nanoid());
};

export default generateId;