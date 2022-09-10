import express from "express";
import { GetAddress } from "./src/Get/Address";
import { GetCompany } from "./src/Get/Company";
import { GetEmployeeById } from "./src/Get/EmployeeById";
import { GetEmployeeByEmail } from "./src/Get/EmployeeByEmail";
import { GetPhone } from "./src/Get/Phone";
import { PostCompany } from "./src/Post/Company";
import { PostEmployee } from "./src/Post/Employee";

const port = 3000;
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ index: "oioio" });
});

app.get("/company", async (req, res) => {
  GetCompany(req.query, (response) => {
    const data = response;
    res.json({ data });
  });
});

app.post("/company", function (req, res) {
  PostCompany(req.body, (response) => {
    const data = response;
    res.json({ data });
  });
});

app.get("/employee", async (req, res) => {
  console.log(req.query);

  if (req.query.id) {
    GetEmployeeById(req.query, (response) => {
      const data = response;
      res.json({ data });
    });

    return;
  }

  if (req.query.email) {
    GetEmployeeByEmail(req.query, (response) => {
      const data = response;
      res.json({ data });
    });

    return;
  }

  return {};
});

app.post("/employee", function (req, res) {
  PostEmployee(req.body, (response) => {
    const data = response;
    res.json({ data });
  });
});

app.get("/phone", async (req, res) => {
  GetPhone((response) => {
    const data = response.rows;
    res.json({ data });
  });
});

app.get("/address", async (req, res) => {
  GetAddress((response) => {
    const data = response.rows;
    res.json({ data });
  });
});

app.listen(port, () => {
  console.log(`Server is running at localhost:${port}`);
});
