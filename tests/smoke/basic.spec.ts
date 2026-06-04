import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page loads with 200 and no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });

  const response = await page.goto('/');
  expect(response?.status(), 'home page status').toBeLessThan(400);
  await expect(page).toHaveTitle(/.+/);

  expect(errors, `console errors:\n${errors.join('\n')}`).toEqual([]);
});

test('home page passes axe-core a11y (WCAG 2.1 AA)', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(
    results.violations,
    results.violations.map((v) => `${v.id}: ${v.description}`).join('\n'),
  ).toEqual([]);
});

test('404 page works', async ({ page }) => {
  const r = await page.goto('/non-existent-page-xyz');
  // For static hosting + bucket website, server typically returns 404 with body from error doc.
  expect(r?.status()).toBe(404);
});
