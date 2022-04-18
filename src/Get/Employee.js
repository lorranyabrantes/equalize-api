import { execute } from "../DbConnection";

export const GetEmployee = (params, callback) => {
  execute(
    `SELECT * FROM T_FUNCIONARIO WHERE cd_pessoa=${params.id}`,
    (resultEmployee) => {
      const {
        rows: [employee],
      } = resultEmployee;
      execute(
        `SELECT * FROM T_TELEFONE WHERE cd_pessoa=${params.id}`,
        (resultPhone) => {
          const {
            rows: [phone],
          } = resultPhone;

          execute(
            `SELECT * FROM T_ENDERECO WHERE cd_endereco=${employee[6]}`,
            (resultAdress) => {
              const {
                rows: [address],
              } = resultAdress;

              execute(
                `SELECT * FROM T_EMPRESA WHERE cd_empresa=${employee[5]}`,
                (resultCompany) => {
                  const {
                    rows: [company],
                  } = resultCompany;

                  callback({
                    id: employee[0],
                    name: employee[1],
                    cpf: employee[2],
                    email: employee[3],
                    profession: employee[4],
                    company: {
                      name: company[1],
                      cnpj: company[2],
                      email: company[3],
                      segment: company[4],
                    },
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
    }
  );
};
