import { execute } from "../DbConnection";

export const company = (callback) => {
  execute("SELECT * FROM TB_VISITA", (result) => {
    callback(result);
  });
};
