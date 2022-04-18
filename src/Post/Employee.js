import { execute } from "../DbConnection";

export const PostEmployee = (body, callback) => {
  const address = `INSERT INTO T_ENDERECO (sq_cep, ds_rua, vl_numero, ds_complemento, ds_cidade, ds_estado) VALUES (${body.address.cep}, '${body.address.street}', '${body.address.number}', '${body.address.complement}', '${body.address.city}', '${body.address.state}') returning cd_endereco into :id`;
  execute(
    address,
    (resultAddress) => {
      execute(
        `SELECT * FROM T_EMPRESA WHERE sq_cnpj=${body.company.cnpj}`,
        (resultCompany) => {
          const {
            rows: [company],
          } = resultCompany;

          const employee = `INSERT INTO T_FUNCIONARIO (nm_pessoa, sq_cpf, ds_email, ds_profissao, cd_endereco, cd_empresa) VALUES ('${body.name}', ${body.cpf}, '${body.email}', '${body.profession}', ${resultAddress.outBinds.id[0]}, ${company[0]}) returning cd_pessoa into :id`;

          execute(
            employee,
            (resultEmployee) => {
              callback(resultEmployee);
              const phone = `INSERT INTO T_TELEFONE (vl_ddi, vl_ddd, vl_telefone, cd_pessoa) VALUES (${body.phone.ddi}, ${body.phone.ddd}, ${body.phone.value}, ${resultEmployee.outBinds.id[0]})`;

              execute(phone, () => {
                callback({ id: resultEmployee.outBinds.id[0] });
              });
            },
            true
          );
        }
      );
    },
    true
  );
};
