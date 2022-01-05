const express = require("express");
const puppeteer = require("puppeteer");
const axios = require("axios");
const readXlsxFile = require("read-excel-file/node");
const path = require("path");
var cors = require("cors");
var fs = require("fs");
const downloadPath = path.resolve("./temp");
const { resSketch } = require("./util");

const app = express();
app.set("port", process.env.PORT || 5000);
app.use(cors());

//
const http = require("http");
const server = http.createServer(app);
const WebSocket = require("ws");
const wss = new WebSocket.Server({ noServer: true });
const setupWSConnection = require("./utils.js").setupWSConnection;

wss.on("connection", setupWSConnection);

server.on("upgrade", function (request, socket, head) {
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit("connection", ws, request);
  });
});

//

const CREDS = {
  login: "sm23122",
  password: "!Adentro7901541841",
};

const projectsFlowHttp = `https://prod-115.westeurope.logic.azure.com:443/workflows/a708e33306f54ec3ab2a58bb5acdf48d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DEsmfM-Ih5JQODA33xMMHTZ_V3ZjkTIXOZXHpc_0tt8`;
const pgrFlowHttp = `https://prod-13.westeurope.logic.azure.com:443/workflows/1704eb055b1240c68a0d116b5f840c8f/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=acXojhTRvrzDmTd8sU1B2lpki4HyVjb7nPG0WlIHXaQ`;

app.get("/", (req, res) => {
  const browserP = puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  let page;
  (async () => {
    page = await (await browserP).newPage();
    await page.setContent(`<p>web running at ${Date()}</p>`);
    res.send(await page.content());
  })()
    .catch((err) => res.sendStatus(500))
    .finally(async () => await page.close());
});

app.get("/voxel", (req, res) => {
  const gen = resSketch(
    { x: 16, y: 16, z: 16 },
    { padFrac: 0.1 },
    (scene, ops) => {
      // ops.fillScene(scene); // uncomment for nice variation
      for (let i = 0; i < 1000; i++) {
        ops.randomBox(scene, Math.random() < 0.85 ? 0 : 1);
      }
    }
  );
  res.send(gen);
});

app.get("/screenshot/:url", (req, res) => {
  const browserP = puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    defaultViewport: { width: 800, height: 600, deviceScaleFactor: 0.5 },
  });
  let url = req.params.url;
  let page;
  (async () => {
    page = await (await browserP).newPage();
    await page.goto(url, {
      waitUntil: "networkidle0",
    });
    const b64string = await page.screenshot({ encoding: "base64" });
    res.send(b64string);
  })()
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    })
    .finally(async () => {
      await page.close();
      await (await browserP).close();
    });
});

app.get("/projects/:id", (req, res) => {
  const browserP = puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  let id = req.params.id;
  let page;
  (async () => {
    let responseObject = {
      varClient: null,
      varContribution: null,
      varDuration: null,
      varIncome: null,
      varRIDS: null,
      varStart: null,
      varTitle: null,
      varStatus: null,
      varType: null,
      varContent: null,
      varContentHPL: null,
      varID: null,
      varCostCode: null,
      summary: null,
    };

    page = await (await browserP).newPage();
    await page.goto("https://cis2.cardiffmet.ac.uk/CostingAndPricing/", {
      waitUntil: "networkidle0",
    });

    await page.type("#userNameInput", CREDS.login);
    await page.type("#passwordInput", CREDS.password);
    await Promise.all([
      page.click("#submitButton"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await page.goto(
      `https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/${id}/edit/personnel`,
      {
        waitUntil: "networkidle0",
      }
    );

    //const cookies = await page.cookies();

    const pageContent = await page.content();

    const positionStart = pageContent.indexOf(`id="staffTimeTable"`);
    const positionEnd = pageContent.indexOf(`table-remove-staffCost`);
    const extracted = pageContent.substring(positionStart, positionEnd);
    const blitzed = extracted.replace(/["]/gi, "blitz");

    responseObject.varContent = blitzed;

    const positionStartHPL = pageContent.indexOf(`id="hplCoverTable"`);
    const positionEndHPL = pageContent.indexOf(`"table-remove-staffCost hpl"`);
    const extractedHPL = pageContent.substring(
      positionStartHPL,
      positionEndHPL
    );
    const blitzedHPL = extractedHPL.replace(/["]/gi, "blitz");

    responseObject.varContentHPL = blitzedHPL;

    await page.goto(
      `https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/${id}/edit/details`,
      {
        waitUntil: "networkidle0",
      }
    );

    responseObject.varStatus = await page.evaluate(
      () =>
        document.querySelector("#form > div:nth-child(6) > div > div > input")
          .value
    );

    responseObject.summary = await page.evaluate(
      () => document.querySelector("#summary").innerHTML
    );
    responseObject.varTitle = await page.evaluate(
      () => document.querySelector("#name").value
    );
    responseObject.varClient = await page.evaluate(
      () => document.querySelector("#client").value
    );
    responseObject.varStart = await page.evaluate(
      () => document.querySelector("#startDate").value
    );
    responseObject.varDuration = await page.evaluate(
      () => document.querySelector("#estimatedDurationInMonths").value
    );
    responseObject.varType = await page.evaluate(
      () => document.querySelector("#projectType").selectedOptions[0].label
    );

    await page.goto(
      `https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/${id}/edit/summary`,
      {
        waitUntil: "networkidle0",
      }
    );
    responseObject.varIncome = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(8) > input"
        ).value
    );
    responseObject.varContribution = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(16) > input"
        ).value
    );
    responseObject.varRIDS = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(18) > input"
        ).value
    );

    responseObject.varCostCode = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(5) > input"
        ).value
    );

    responseObject.varID = id;

    axios
      .post(projectsFlowHttp, responseObject)
      .then((res) => {
        console.log(res);
      })
      .then(() =>
        res.send(
          `Project <b>${responseObject.varTitle}</b> uploaded to R&I Tracker`
        )
      );
  })()
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    })
    .finally(async () => {
      await page.close();
      await (await browserP).close();
    });
});

app.get("/riscap/:id", (req, res) => {
  const browserP = puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  let id = req.params.id;
  let page;
  (async () => {
    let responseObject = {
      varClient: null,
      varContribution: null,
      varDuration: null,
      varIncome: null,
      varRIDS: null,
      varStart: null,
      varTitle: null,
      varStatus: null,
      varType: null,
      //varContent: null,
      //varContentHPL: null,
      varID: null,
      varCostCode: null,
      summary: null,
    };

    page = await (await browserP).newPage();
    await page.goto("https://cis2.cardiffmet.ac.uk/CostingAndPricing/", {
      waitUntil: "networkidle0",
    });

    await page.type("#userNameInput", CREDS.login);
    await page.type("#passwordInput", CREDS.password);
    await Promise.all([
      page.click("#submitButton"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    /* await page.goto(
      `https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/${id}/edit/personnel`,
      {
        waitUntil: "networkidle0",
      }
    );

    //const cookies = await page.cookies();

    const pageContent = await page.content();

    const positionStart = pageContent.indexOf(`id="staffTimeTable"`);
    const positionEnd = pageContent.indexOf(`table-remove-staffCost`);
    const extracted = pageContent.substring(positionStart, positionEnd);
    const blitzed = extracted.replace(/["]/gi, "blitz");

    responseObject.varContent = blitzed;

    const positionStartHPL = pageContent.indexOf(`id="hplCoverTable"`);
    const positionEndHPL = pageContent.indexOf(`"table-remove-staffCost hpl"`);
    const extractedHPL = pageContent.substring(
      positionStartHPL,
      positionEndHPL
    );
    const blitzedHPL = extractedHPL.replace(/["]/gi, "blitz");

    responseObject.varContentHPL = blitzedHPL; */

    await page.goto(
      `https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/${id}/edit/details`,
      {
        waitUntil: "networkidle0",
      }
    );

    responseObject.varStatus = await page.evaluate(
      () =>
        document.querySelector("#form > div:nth-child(6) > div > div > input")
          .value
    );

    responseObject.summary = await page.evaluate(
      () => document.querySelector("#summary").innerHTML
    );
    responseObject.varTitle = await page.evaluate(
      () => document.querySelector("#name").value
    );
    responseObject.varClient = await page.evaluate(
      () => document.querySelector("#client").value
    );
    responseObject.varStart = await page.evaluate(
      () => document.querySelector("#startDate").value
    );
    responseObject.varDuration = await page.evaluate(
      () => document.querySelector("#estimatedDurationInMonths").value
    );
    responseObject.varType = await page.evaluate(
      () => document.querySelector("#projectType").selectedOptions[0].label
    );

    await page.goto(
      `https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects/${id}/edit/summary`,
      {
        waitUntil: "networkidle0",
      }
    );
    responseObject.varIncome = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(8) > input"
        ).value
    );
    responseObject.varContribution = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(16) > input"
        ).value
    );
    responseObject.varRIDS = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(18) > input"
        ).value
    );

    responseObject.varCostCode = await page.evaluate(
      () =>
        document.querySelector(
          "#form > div:nth-child(10) > div:nth-child(1) > div > div.card-body > div:nth-child(5) > input"
        ).value
    );

    responseObject.varID = id;
    await res.send(responseObject);
    /* axios
      .post(projectsFlowHttp, responseObject)
      .then((res) => {
        console.log(res);
      })
      .then(() =>
        res.send(
          `Project <b>${responseObject.varTitle}</b> uploaded to R&I Tracker`
        )
      ); */
  })()
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    })
    .finally(async () => {
      await page.close();
      await (await browserP).close();
    });
});

app.get("/pgr/:id", (req, res) => {
  const browserP = puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  console.log("puppeteer launched");
  let id = req.params.id;
  console.log(`looking for ${id}`);
  let page;
  (async () => {
    page = await (await browserP).newPage();
    await page.goto(
      "https://research.cardiffmet.ac.uk/do/cardiffmet-auth/login?rdr=%2Fdo%2Factivity%2Fgraduate-school",
      {
        waitUntil: "networkidle0",
      }
    );

    await page.type("#username", CREDS.login);
    await page.type("#password", CREDS.password);
    await Promise.all([
      page.click(
        "#o > div > div > div > div > div > form > p:nth-child(5) > input[type=submit]"
      ),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);
    console.log("logged in");

    await page.goto(
      "https://research.cardiffmet.ac.uk/do/phd-doctoral-supervision/doctoral-researchers-dashboard/all",
      {
        waitUntil: "networkidle0",
      }
    );

    res
      .status(200)
      .send("Upload is queued. Please check CSSHSRI mailbox for updates");

    console.log(
      "🚀 ~ file: index.js ~ line 215 ~ path.join(__dirname, `../temp${id}`",
      path.join(__dirname, `/app/temp${id}`)
    );

    await page._client.send("Page.setDownloadBehavior", {
      behavior: "allow",
      downloadPath: path.join(__dirname, `/app/temp${id}`),
    });
    console.log("download behaviour set");

    await Promise.all([
      page.click("#o > form > div.abe > input[type=submit]:nth-child(2)"),
      //page.waitForNavigation({ waitUntil: "networkidle0", timeout: 0 }),
    ]);
    console.log("download button activated");
    async function waitFile(filename) {
      return new Promise(async (resolve, reject) => {
        if (!fs.existsSync(filename)) {
          console.log("file still not found. searching again");
          await delay(3000);
          await waitFile(filename);
          resolve();
        } else {
          console.log("file found");
          resolve();
        }
      });
    }

    let result;

    function delay(time) {
      return new Promise(function (resolve) {
        setTimeout(resolve, time);
      });
    }
    await waitFile(
      path.join(
        __dirname,
        `/app/temp${id}/Past_and_current_Doctoral_researchers_dashboard.xlsx`
      )
    );
    console.log(
      `reading file ${path.join(
        __dirname,
        `/app/temp${id}/Past_and_current_Doctoral_researchers_dashboard.xlsx`
      )}`
    );
    readXlsxFile(
      path.join(
        __dirname,
        `/app/temp${id}/Past_and_current_Doctoral_researchers_dashboard.xlsx`
      )
    ).then((rows) => {
      result = rows.filter((item) => item.includes(id))[0];
      const resultObject = {
        "Student ID": result[0],
        Name: result[1],
        Column1: result[2],
        Column2: result[3],
        School: result[4],
        "Date of birth": result[5],
        Gender: result[6],
        "Country group": result[7],
        Nation: result[8],
        Ethnicity: result[9],
        Disability: result[10],
        "Past researcher": result[11],
        DoS: result[12],
        Column3: result[13],
        Column4: result[14],
        Start: result[15],
        End: result[16],
        Stage: result[17],
        Status: result[18],
        Email: result[24],
        "Project title": result[25],
        "Registration end": result[21],
        Stage5: result[22],
        "Fee status": result[26],
        Mode: result[27],
        Type: result[28],
        "Director of studies": result[29],
        Column6: result[30],
        Column7: result[31],
        "Director of studies (email)": result[32],
        "Second (i)": result[33],
        Column8: result[34],
        Column9: result[35],
        "Second (i) (email)": result[36],
        "Second (ii)": result[37],
        Column10: result[38],
        Column11: result[39],
        "Second (ii) (email)": result[40],
        "Second (iii)": result[41],
        Column12: result[42],
        Column13: result[43],
        "Second (iii) (email)": result[44],
        Supervisor: result[45],
        Column14: result[46],
        Column15: result[47],
        "Supervisor (email)": result[48],
        "Project start": result[49],
        /* "Project start - Deadline (earliest)": result[47],
        "Project start - Deadline (latest)": result[48],
        "Research degree proposal, submission": result[49],
        "Research degree proposal, submission - Deadline (earliest)":
          result[50],
        "Research degree proposal, submission - Deadline (latest)": result[51],
        "Research degree proposal, completion": result[52],
        "Research degree proposal, completion - Deadline (earliest)":
          result[53],
        "Research degree proposal, completion - Deadline (latest)": result[54],
        "Visa, start": result[55],
        "Visa, start - Deadline (earliest)": result[56],
        "Visa, start - Deadline (latest)": result[57],
        "Visa, end": result[58],
        "Visa, end - Deadline (earliest)": result[59],
        "Visa, end - Deadline (latest)": result[60],
        "Transfer, submission": result[61],
        "Transfer, submission - Deadline (earliest)": result[62],
        "Transfer, submission - Deadline (latest)": result[63],
        "Transfer, completion": result[64],
        "Transfer, completion - Deadline (earliest)": result[65],
        "Transfer, completion - Deadline (latest)": result[66],
        "Examination arrangements, submission": result[67],
        "Examination arrangements, submission - Deadline (earliest)":
          result[68],
        "Examination arrangements, submission - Deadline (latest)": result[69],
        "Examination arrangements, completion": result[70],
        "Examination arrangements, completion - Deadline (earliest)":
          result[71],
        "Examination arrangements, completion - Deadline (latest)": result[72],
        "Examination, submission": result[73],
        "Examination, submission - Deadline (earliest)": result[74],
        "Examination, submission - Deadline (latest)": result[75],
        "Examination, completion": result[76],
        "Examination, completion - Deadline (earliest)": result[77],
        "Examination, completion - Deadline (latest)": result[78],
        "Examination, thesis sent": result[79],
        "Examination, thesis sent - Deadline (earliest)": result[80],
        "Examination, thesis sent - Deadline (latest)": result[81],
        "Examination, no amendments": result[82],
        "Examination, no amendments - Deadline (earliest)": result[83],
        "Examination, no amendments - Deadline (latest)": result[84],
        "Examination, minor amendments": result[85],
        "Examination, minor amendments - Deadline (earliest)": result[86],
        "Examination, minor amendments - Deadline (latest)": result[87],
        "Examination, resubmission": result[88],
        "Examination, resubmission - Deadline (earliest)": result[89],
        "Examination, resubmission - Deadline (latest)": result[90],
        "Examination, revisions": result[91],
        "Examination, revisions - Deadline (earliest)": result[92],
        "Examination, revisions - Deadline (latest)": result[93],
        "Examination, viva": result[94],
        "Examination, viva - Deadline (earliest)": result[95],
        "Examination, viva - Deadline (latest)": result[96],
        "Writing up": result[97],
        "Writing up - Deadline (earliest)": result[98],
        "Writing up - Deadline (latest)": result[99],
        "Extension to programme, submission": result[100],
        "Extension to programme, submission - Deadline (earliest)": result[101],
        "Extension to programme, submission - Deadline (latest)": result[102],
        "Change project mode, submission": result[103],
        "Change project mode, submission - Deadline (earliest)": result[104],
        "Change project mode, submission - Deadline (latest)": result[105],
        "Change resumption, submission": result[106],
        "Change resumption, submission - Deadline (earliest)": result[107],
        "Change resumption, submission - Deadline (latest)": result[108],
        "Change supervisors, submission": result[109],
        "Change supervisors, submission - Deadline (earliest)": result[110],
        "Change supervisors, submission - Deadline (latest)": result[111],
        "Suspension from programme, submission": result[112],
        "Suspension from programme, submission - Deadline (earliest)":
          result[113],
        "Suspension from programme, submission - Deadline (latest)":
          result[114],
        "Withdrawal from programme, submission": result[115],
        "Withdrawal from programme, submission - Deadline (earliest)":
          result[116],
        "Withdrawal from programme, submission - Deadline (latest)":
          result[117],
        "Extension to programme, completion": result[118],
        "Extension to programme, completion - Deadline (earliest)": result[119],
        "Extension to programme, completion - Deadline (latest)": result[120],
        "Change project mode, completion": result[121],
        "Change project mode, completion - Deadline (earliest)": result[122],
        "Change project mode, completion - Deadline (latest)": result[123],
        "Change resumption, completion": result[124],
        "Change resumption, completion - Deadline (earliest)": result[125],
        "Change resumption, completion - Deadline (latest)": result[126],
        "Change supervisors, completion": result[127],
        "Change supervisors, completion - Deadline (earliest)": result[128],
        "Change supervisors, completion - Deadline (latest)": result[129],
        "Suspension from programme, completion": result[130],
        "Suspension from programme, completion - Deadline (earliest)":
          result[131],
        "Suspension from programme, completion - Deadline (latest)":
          result[132],
        "Withdrawal from programme, completion": result[133],
        "Withdrawal from programme, completion - Deadline (earliest)":
          result[134],
        "Withdrawal from programme, completion - Deadline (latest)":
          result[135],
        "Project end": result[136],
        "Project end - Deadline (earliest)": result[137],
        "Project end - Deadline (latest)": result[138], */
      };
      console.log(resultObject);
      axios
        .post(pgrFlowHttp, resultObject)
        .catch((e) => console.log(e.message));
    });
    fs.rmdirSync(path.join(__dirname, `/app/temp${id}`), { recursive: true });
  })()
    .catch((err) => {
      console.log(err);
    })
    .finally(async () => {
      await page.close();
      await (await browserP).close();
    });
});

server.listen(app.get("port"), () =>
  console.log("app running on port", app.get("port"))
);
