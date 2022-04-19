require("dotenv").config();
const oracledb = require("oracledb");
oracledb.autoCommit = true;

const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const ORACLE_CLIENT_PATH = process.env.ORACLE_CLIENT_PATH;

const connect = (callback) => {
  try {
    oracledb.initOracleClient({
      libDir: `${ORACLE_CLIENT_PATH}`,
    });
  } catch (err) {
    console.log("Oracle Client library has already been initialized");
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

export const execute = async (query, callback, returnId) => {
  connect((connection) => {
    let params;
    if (returnId) {
      params = {
        id: {
          type: oracledb.NUMBER,
          dir: oracledb.BIND_OUT,
        },
      };
    } else {
      params = {};
    }

    connection.execute(query, params, function (err, result) {
      if (err) {
        console.error("err", err);
        return;
      }

      connection.close(function (err) {
        if (err) {
          console.error("err", err);
        }

        callback(result);
      });
    });
  });
};
