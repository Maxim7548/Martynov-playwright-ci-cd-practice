import { type Locator, type Page } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(page: Page) {
    this.page = page;
    
    this.usernameInput = page.locator('#user-name')
    this.passwordInput = page.locator('#password')
    this.loginButton = page.locator('#login-button')
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/')
  }

  async fillLoginForm(user: string, pass: string) {
    await this.usernameInput.fill(user)
    await this.passwordInput.fill(pass)
  }

  async submit() {
    await this.loginButton.click()
  }

  async login(user: string, pass: string) {
    await this.fillLoginForm(user, pass)
    await this.submit()
  }
}