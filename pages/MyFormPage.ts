import { type Locator, type Page } from '@playwright/test';

export class MyFormPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator; 

  constructor(page: Page) {
    this.page = page;
    
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login_button');
    this.errorMessage = page.locator('.error_status');
  }

  async goto() {
    await this.page.goto('https://www.themoviedb.org/login');
  }

  async fillLoginForm(user: string, pass: string) {
    await this.usernameInput.fill(user);
    await this.passwordInput.fill(pass);
  }

  async submit() {
    await this.loginButton.click();
  }

  async login(user: string, pass: string) {
    await this.fillLoginForm(user, pass);
    await this.submit();
  }
}