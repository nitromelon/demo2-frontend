import { test } from '@playwright/test';

// test acc: a@a.com | 123

test('Login', async ({ page }) => {
	await page.goto('/');
	await page.fill('#email', 'a@a.com');
	await page.fill('#password', '123');
	await page.click('#login');
	await page.waitForSelector('#logout');
});

test('Signup', async ({ page }) => {
	await page.goto('/');
	await page.click('#switch');
	await page.waitForSelector('#fullname');
	await page.fill('#fullname', `Test ${Math.random()}`);
	await page.fill('#email', `test${Math.random()}@test.com`);
	await page.fill('#password', '123');
	await page.click('#login');
});

test('Logout', async ({ page }) => {
	await page.goto('/');
	await page.fill('#email', 'a@a.com');
	await page.fill('#password', '123');
	await page.click('#login');
	await page.waitForTimeout(2000);
	await page.waitForSelector('#logout');
	await page.click('#logout');
	await page.waitForSelector('#email');
});