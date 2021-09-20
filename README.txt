2

This answer is fantastic, but in the interests of a minimal, runnable example I thought I'd share my complete code and workflow for getting up and running with a Puppeteer-based web app.

See this answer for a simple scheduler and a clock process version (although all three approaches can coexist in one app without doing anything special).

package.json:
{
"name": "test-puppeteer",
"version": "1.0.0",
"description": "",
"scripts": {
"start": "node index.js"
},
"author": "",
"license": "ISC",
"dependencies": {
"express": "^4.17.1",
"puppeteer": "^9.1.1"
}
}
Procfile:
web: node index.js
index.js:
const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
app.set("port", process.env.PORT || 5000);

const browserP = puppeteer.launch({
args: ["--no-sandbox", "--disable-setuid-sandbox"]
});

app.get("/", (req, res) => {
// FIXME move to a worker task; see https://devcenter.heroku.com/articles/node-redis-workers
let page;
(async () => {
page = await (await browserP).newPage();
await page.setContent(`<p>web running at ${Date()}</p>`);
res.send(await page.content());
})()
.catch(err => res.sendStatus(500))
.finally(async () => await page.close())
;
});

app.listen(app.get("port"), () =>
console.log("app running on port", app.get("port"))
);
Set up
Install Heroku CLI and create a new app with Node and Puppeteer buildpacks (see this answer):

heroku create
heroku buildpacks:add --index 1 https://github.com/jontewks/puppeteer-heroku-buildpack -a cryptic-dawn-48835
heroku buildpacks:add --index 1 heroku/nodejs -a cryptic-dawn-48835
(replace cryptic-dawn-48835 with your app name)

Deploy:

git init
git add .
git commit -m "initial commit"
heroku git:remote -a cryptic-dawn-48835
git push heroku master
Verify that it worked with curl https://cryptic-dawn-48835.herokuapp.com. You should see something like

<html><head></head><body><p>web running at Wed May 19 2021 02:12:48 GMT+0000 (Coordinated Universal Time)</p></body></html>
Share
