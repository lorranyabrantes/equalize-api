import { execute } from "../DbConnection";

export const GetCompany = (params, callback) => {
  execute(
    `SELECT * FROM T_EMPRESA WHERE cd_empresa=${params.id}`,
    (resultCompany) => {
      const {
        rows: [company],
      } = resultCompany;

      execute(
        `SELECT * FROM T_TELEFONE WHERE cd_empresa=${params.id}`,
        (resultPhone) => {
          const {
            rows: [phone],
          } = resultPhone;

          execute(
            `SELECT * FROM T_ENDERECO WHERE cd_endereco=${company[5]}`,
            (resultAdress) => {
              const {
                rows: [address],
              } = resultAdress;

              callback({
                id: company[0],
                name: company[1],
                cnpj: company[2],
                email: company[3],
                segment: company[4],

                address: {
                  cep: address[1],
                  street: address[2],
                  number: address[3],
                  complement: address[4],
                  city: address[5],
                  state: address[6],
                },
                phone: {
                  ddi: phone[1],
                  ddd: phone[2],
                  value: phone[3],
                },
              });
            }
          );
        }
      );
    }
  );
};
