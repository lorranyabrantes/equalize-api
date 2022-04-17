const http = require("http");
require("dotenv").config();

const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;

const oracledb = require("oracledb");
let error;
let queryResult;

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
      error = err;
      return;
    }

    const sql = `SELECT * FROM TB_VISITA`;

    connection.execute(sql, [], function (err, result) {
      if (err) {
        error = err;
        return;
      }

      console.log(result);

      user = result.rows[0][0];
      queryResult = null;

      connection.close(function (err) {
        if (err) {
          console.log(err);
        }
      });
    });
  }
);

http
  .createServer(function (request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });

    if (error === null) {
      response.end(
        "Connection test succeeded. You connected to Exadata Express as " +
          queryResult +
          "!"
      );
    } else if (error instanceof Error) {
      response.write(
        "Connection test failed. Check the settings and redeploy app!\n"
      );
      response.end(error.message);
    } else {
      response.end("Connection test pending. Refresh after a few seconds...");
    }
  })
  .listen(5000);
