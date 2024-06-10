# playwright-challenge

## **Overview:**
This is an Automation project using Playwright and Typescript and uses playwright-testrunner to execute test cases. 
This project is enabled with GH Actions for CI/CD.

## **Overall progress:**
| Test                         | Status   |
|------------------------------|----------|
| Part 1: API Test             | Complete |
| Part 2: UI test (Scenario A) | Complete |
| Part 2: UI test (Scenario B) | Partial  |
| CI Pipeline using GH Actions | Complete |

#### Steps to use
##### 1. Installation
Playwright framework requires [Node.js](https://nodejs.org/) v20 to run.

Installing the dependencies.
```sh
npm ci
```

```sh
npx playwright install
```

##### 2. Execution
To run individual test locally use below command.
```sh
set TEST_NAME=<TestFileName> 
npm run local:test
```
Example:
```sh
set TEST_NAME=WeatherRESTAPITest.spec.ts 
npm run local:test
```

To run individual test locally in [UI Mode](https://playwright.dev/docs/test-ui-mode) use below command.
```sh
set TEST_NAME=<TestFileName> && npm run local:test:ui
```

```sh
set TEST_NAME=WeatherRESTAPITest.spec.ts 
npm run local:test:ui
```

To run all the tests(regression) use the below command:
```sh
npm run create:suite SHEET=Regression 
npm test
```

##### 3. Set other configs
#### Supported Browsers
1. Chrome - default browser
2. Firefox
3. MS Edge
4. WebKit - web browser engine used by Safari

To change any environment configuration in .env file at run time use set command.
Eg: To change browser to MS Edge use below command
```sh
set BROWSER=edge
```
Similar command can be used to update other environment configuration

##### 4. Report & Logs
Playwright HTML report will be present inside
```sh
test-results/results/index.html
```
Execution log will be present in the log file.
```sh
test-results/logs/execution.log
```

##### 5. GH Pipeline
Github workflow steps are  mentioned in the below path.
```sh
.github/workflows/node.js.yml
```
