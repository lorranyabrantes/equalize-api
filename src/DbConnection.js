require("dotenv").config();
const oracledb = require("oracledb");

const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;

const connect = (callback) => {
  try {
    oracledb.initOracleClient({
      libDir: "/Users/loabrantes/Downloads/instantclient_19_8",
    });
  } catch (err) {
    console.error("Whoops!");
    console.error(err);
    process.exit(1);
  }

  oracledb.getConnection(
    {
      user: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      connectString: `(DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = ${DATABASE_HOST})(PORT = 1521))(CONNECT_DATA =(SID= ORCL)))`,
    },

    function (err, connection) {
      if (err) {
        console.error("err", err);
        return;
      }

      callback(connection);
    }
  );
};

const close = (connection) => {
  connection.close(function (err) {
    if (err) {
      console.error("err", err);
    }
  });
};

export const execute = async (query, callback, params = []) => {
  connect((connection) => {
    connection.execute(query, params, function (err, result) {
      if (err) {
        console.error("err", err);
        return;
      }

      close(connection);

      callback(result);
    });
  });
};
