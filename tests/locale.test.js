const { test, expect } = require('@playwright/test');

test('Vérifie les différences entre les versions FR et EN', async ({ page }) => {
  // Test version française
  await page.goto('http://localhost:8080/?lang=fr');
  await page.waitForTimeout(500);
  const frContent = await page.textContent('body');
  const frDate = await page.locator('[data-testid="date"]').textContent();
  
  // Test version anglaise
  await page.goto('http://localhost:8080/?lang=en');
  await page.waitForTimeout(500);
  const enContent = await page.textContent('body');
  const enDate = await page.locator('[data-testid="date"]').textContent();

  // Assertions
  expect(frContent).not.toBe(enContent);
  expect(frDate).toMatch(/\d{2}\/\d{2}\/\d{4}/); // Format date FR
  expect(enDate).toMatch(/\d{4}-\d{2}-\d{2}/); // Format date EN
});
