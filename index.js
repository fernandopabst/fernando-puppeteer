const express = require("express");
const puppeteer = require("puppeteer");
const axios = require("axios");

const app = express();
app.set("port", process.env.PORT || 5000);

const CREDS = {
  login: "sm23122",
  password: "!Adentro7901541841",
};

const projectsFlowHttp = `https://prod-115.westeurope.logic.azure.com:443/workflows/a708e33306f54ec3ab2a58bb5acdf48d/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=DEsmfM-Ih5JQODA33xMMHTZ_V3ZjkTIXOZXHpc_0tt8`;

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
      )
      .then(async () => await page.close());
  })()
    .catch((err) => {
      res.sendStatus(500);
      console.log(err);
    })
    .finally(async () => await page.close());
});

app.listen(app.get("port"), () =>
  console.log("app running on port", app.get("port"))
);
