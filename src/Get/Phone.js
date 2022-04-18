import { execute } from "../DbConnection";

export const GetPhone = (callback) => {
  execute("SELECT * FROM T_TELEFONE", (result) => {
    callback(result);
  });
};
