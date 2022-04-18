import { execute } from "../DbConnection";

export const PostCompany = (body, callback) => {
  const address = `INSERT INTO T_ENDERECO (sq_cep, ds_rua, vl_numero, ds_complemento, ds_cidade, ds_estado) VALUES (${body.address.cep}, '${body.address.street}', '${body.address.number}', '${body.address.complement}', '${body.address.city}', '${body.address.state}') returning cd_endereco into :id`;

  execute(
    address,
    (resultAddress) => {
      const company = `INSERT INTO T_EMPRESA (nm_empresa, sq_cnpj, ds_email, ds_segmento, cd_endereco) VALUES ('${body.name}', ${body.cnpj}, '${body.email}', '${body.segment}', ${resultAddress.outBinds.id[0]}) returning cd_empresa into :id`;

      execute(
        company,
        (resultCompany) => {
          const phone = `INSERT INTO T_TELEFONE (vl_ddi, vl_ddd, vl_telefone, cd_empresa) VALUES (${body.phone.ddi}, ${body.phone.ddd}, ${body.phone.value}, ${resultCompany.outBinds.id[0]})`;

          execute(phone, (resultPhone) => {
            callback({ id: resultCompany.outBinds.id[0] });
          });
        },
        true
      );
    },
    true
  );
};
