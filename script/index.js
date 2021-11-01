const puppeteer = require('puppeteer');
const fs = require('fs');

//Scraping
const jobs = (async () => {
  const browser = await puppeteer.launch({
      headless: true,
      devtools: true
  });
  const page = await browser.newPage();
  await page.goto('https://lingarogroup.com/careers/');
  
  console.log("Collecting data...")
  const jobs = await page.evaluate(() => Array.from(document.querySelectorAll('div[class="jobs-list"] > div'))
  .map(job => ({
    jobTitle: job.getAttribute('data-title'),
    jobType: job.getAttribute('class'),
    jobLocation: job.getAttribute('data-country'),
    requirements: job.getAttribute('data-requirements'),
  })));
  console.log("Data collected...")

  return jobs
})();


//Converting object to JSON
async function fetchData() {
   const sendFile = await jobs;

      const file = JSON.stringify(sendFile);
    fs.writeFile('jobs.json', file, (err) => {
        if (err) {
            throw err;
        }
        console.log("File created!");
    });
  }
  
  fetchData()
  .catch(e => {
    console.log('There has been a problem with your fetch operation: ' + e.message);
  });