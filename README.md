# Playwright Project Template with TypeScript

This is a project template for running end-to-end tests using Playwright with TypeScript. It includes configurations for
linting, formatting, testing, and deployment scripts.

## 1. Scripts

| Script            | Description                                                                                                        |
|-------------------|--------------------------------------------------------------------------------------------------------------------|
| **clean**         | Delete the `dist` directory to start fresh.                                                                        |
| **co:login**      | Log in to AWS CodeArtifact to access the npm repository.                                                           |
| **prebuild**      | Clean the `dist` directory before compiling TypeScript files.                                                      |
| **build**         | Compile TypeScript files into JavaScript.                                                                          |
| **validate**      | Check TypeScript types without emitting files.                                                                     |
| **ready**         | Clean `dist`, `node_modules`, and `package-lock.json`, then log in to AWS CodeArtifact and reinstall dependencies. |
| **test**          | Run Playwright tests using Chromium in headless mode.                                                              |
| **test:ci**       | Run Playwright tests for continuous integration.                                                                   |
| **test:chrome**   | Run Playwright tests in Chrome with a single worker and retries disabled.                                          |
| **debug**         | Run Playwright tests in debug mode.                                                                                |
| **local**         | Run Playwright tests locally in Chromium with a single worker and retries disabled.                                |
| **test:reg**      | Run Playwright tests excluding tests marked with `@fail`.                                                          |
| **test:smoke**    | Run Playwright tests tagged with `@smoke`.                                                                         |
| **report**        | Show the Playwright test report.                                                                                   |
| **ui**            | Run Playwright tests with a specific UI port configuration.                                                        |
| **trace**         | Show the Playwright test trace.                                                                                    |
| **record**        | Generate Playwright test scripts.                                                                                  |
| **clear:storage** | Remove Playwright storage authentication files.                                                                    |
| **lint**          | Lint TypeScript files using ESLint and configured rules.                                                           |
| **lint:fix**      | Automatically fix linting issues where possible.                                                                   |
| **prettier**      | Format code using Prettier across specified files.                                                                 |
| **prepare**       | Set up Husky Git hooks for pre-commit actions.                                                                     |
| **postinstall**   | Install Chromium required for Playwright.                                                                          |

## 2. Usage

1. **Install Dependencies**: Run `npm install` to install project dependencies.
2. **Build**: Run `npm run build` to compile TypeScript files.
3. **Run Tests**:
    - `npm test` to run all tests in headless Chromium.
    - `npm run test:chrome` to run tests in Chrome with a graphical interface.
    - `npm run test:smoke` to run smoke tests.
4. **Linting**: Use `npm run lint` to check for linting errors.
5. **Formatting**: Use `npm run prettier` to format code according to project standards.

### 2.1 Configuration

- Modify Playwright test configurations in `playwright.config.ts`.
- Adjust ESLint rules in `.eslintrc.json`.
- Define Prettier rules in `package.json`.

### 2.2 AWS Dependencies

- Utilize AWS SDK clients for Cognito, DynamoDB, Lambda, S3, and more.
- AWS CodeArtifact login and repository setup are integrated into deployment scripts.

## 3. Development

- `lint-staged` and `husky` are set up to run ESLint and Prettier on staged files before commit.

### 3.1 Dependencies

| Dependency                                  | Version | Description                                                       |
|---------------------------------------------|---------|-------------------------------------------------------------------|
| `@aws-sdk/client-cognito-identity-provider` | 3.572.0 | AWS SDK client for Cognito Identity Provider                      |
| `@aws-sdk/client-dynamodb`                  | 3.572.0 | AWS SDK client for DynamoDB                                       |
| `@aws-sdk/client-lambda`                    | 3.572.0 | AWS SDK client for AWS Lambda                                     |
| `@aws-sdk/client-s3`                        | 3.572.0 | AWS SDK client for Amazon S3                                      |
| `@aws-sdk/lib-dynamodb`                     | 3.572.0 | AWS SDK library for DynamoDB                                      |
| `@faker-js/faker`                           | ^8.4.1  | Library for generating fake data                                  |
| `@ihf-rivendell/qa`                         | 0.3.107 | Library for quality assurance tools                               |
| `@playwright/test`                          | ^1.44.0 | Framework for writing Playwright tests                            |
| `@tsconfig/node18`                          | 18.2.4  | TypeScript configuration for Node.js 18                           |
| `cross-env`                                 | ^7.0.3  | Utility to set environment variables across platforms             |
| `dotenv-extended`                           | ^2.9.0  | Extended version of dotenv for managing environment variables     |
| `eslint-config-airbnb-base`                 | ^15.0.0 | ESLint configuration based on Airbnb's style guide (Base rules)   |
| `eslint-config-airbnb-typescript`           | ^18.0.0 | ESLint configuration for TypeScript based on Airbnb's style guide |
| `eslint-config-prettier`                    | ^9.1.0  | ESLint configuration to disable rules that conflict with Prettier |

### 3.2 DevDependencies

| Dependency               | Version | Description                                     |
|--------------------------|---------|-------------------------------------------------|
| `eslint-plugin-prettier` | ^5.1.3  | ESLint plugin to run Prettier as an ESLint rule |
| `prettier`               | 3.2.5   | Tool for code formatting                        |

## 4. Folder Structure

```
# Folder Structure
.
├── dist/                 # Compiled TypeScript files
├── playwright/           # Utility functions for performing various actions in Playwright
├── test-setup/           # Test setup configurations
├── tests/                # End-to-end test scripts
├── .eslintrc.json        # ESLint configuration
├── .husky/               # Husky hooks
├── package.json          # Project dependencies and scripts
├── playwright.config.ts  # Playwright configuration
├── README.md             # Project README (you are here)
└── tsconfig.json         # TypeScript compiler options
```

## 5. Contribution Guidelines

- Follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard for commit messages.
- Name pull requests using the format **`[Ticket Code]: Brief Description`**

## Notes

- This template assumes Chromium is required for Playwright tests.
- Adjust AWS SDK versions based on project requirements.
