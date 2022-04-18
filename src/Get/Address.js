import { execute } from "../DbConnection";

export const GetAddress = (callback) => {
  execute("SELECT * FROM T_ENDERECO", (result) => {
    callback(result);
  });
};
