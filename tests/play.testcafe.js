// next line is optional, just for IDEs autocomplete :
/// <reference types="@applitools/eyes-testcafe" />

import { Eyes, ConsoleLogHandler, ClassicRunner, VisualGridRunner } from "@applitools/eyes-testcafe/dist/index";
import { Selector } from 'testcafe';

// Initialize the eyes
const runner = new VisualGridRunner();
const eyes = new Eyes(runner);

// Set page used in the test
fixture`Testcafe Demo App`.page`https://sandbox.applitools.com/bank`
    // Call Close on eyes to let the server know it should display the results
    .afterEach(async () => eyes.close())
    .after(async () => {
        // Wait and collect all test results
        // we pass false to this method to suppress the exception that is thrown if we
        // find visual differences  
        let allTestResults = await eyes.waitForResults(false)
        // Print results
        console.log(allTestResults)
    });

test('ultraFastTest', async t => {
    await eyes.setLogHandler(new ConsoleLogHandler(true));
    // Call Open on eyes to initialize a test session
    await eyes.open({
        t, // pass testcafe contorller
        appName: 'Demo App - Testcafe - Ultrafast',
        testName: 'Smoke Test - Testcafe - Ultrafast',
    });

    // check the login page with fluent api, see more info here
    // https://applitools.com/docs/topics/sdk/the-eyes-sdk-check-fluent-api.html
    await eyes.checkWindow({
        tag: "Login Window",
        target: 'window',
        fully: true
    });

    await t
        .typeText(Selector("#username"), "Chris")
        .typeText(Selector("#password"), "CorrectHorseBatteryStaple")

    // This will create a test with two test steps.
    await t.click('#log-in')

    // Check the app page
    await eyes.checkWindow({
        tag: "App Window",
        target: 'window',
        fully: true
    })
});
