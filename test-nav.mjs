import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto("http://localhost:5181/");
await page.waitForTimeout(1000);

// Open mobile menu
await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(500);

// Click "Experience" link
const before = await page.evaluate(() => window.scrollY);
console.log("scrollY before click:", before);

await page.locator('a[href="#experience"]').last().click();
await page.waitForTimeout(1000);

const after = await page.evaluate(() => window.scrollY);
const targetTop = await page.evaluate(() => {
  const el = document.getElementById("experience");
  return el ? el.getBoundingClientRect().top + window.scrollY : null;
});
console.log("scrollY after click:", after);
console.log("target element offsetTop:", targetTop);
console.log("hash:", await page.evaluate(() => location.hash));

await browser.close();
