const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.set("port", process.env.PORT || 5000);

const CREDS = {
  login: "sm23122",
  password: "!Adentro7901541841",
};

const browserP = puppeteer.launch({
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

app.get("/", (req, res) => {
  let page;
  (async () => {
    page = await (await browserP).newPage();
    await page.setContent(`<p>web running at ${Date()}</p>`);
    res.send(await page.content());
  })()
    .catch((err) => res.sendStatus(500))
    .finally(async () => await page.close());
});

app.get("/projects", (req, res) => {
  let page;
  (async () => {
    page = await (await browserP).newPage();
    await page.goto("https://cis2.cardiffmet.ac.uk/CostingAndPricing/", {
      waitUntil: "networkidle0",
    });
    /* Run javascript inside of the page */

    /*  let data = await page.evaluate(() => {
          let title = document.querySelector(
            'h1[data-testid="hero-title-block__title"] '
          ).innerText;
      
          return {
            title,
          };
        });
        console.log(data); */
    await page.type("#userNameInput", CREDS.login);
    await page.type("#passwordInput", CREDS.password);
    await Promise.all([
      page.click("#submitButton"),
      page.waitForNavigation({ waitUntil: "networkidle0" }),
    ]);

    await page.goto(
      "https://cis2.cardiffmet.ac.uk/CostingAndPricing/projects",
      {
        waitUntil: "networkidle0",
      }
    );

    let data = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll("a"),
        (element) => element.textContent
      )
    );

    const cookies = await page.cookies();

    res.send(data);
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
