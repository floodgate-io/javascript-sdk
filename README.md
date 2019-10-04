# FloodGate SDK for JavaScript

## Overview

This is the JavaScript SDK for [Floodgate](https://floodgate.io), a feature rollout service which provides a centralised management console for managing remote feature flags.

## Compatibility

This SDK is designed to work with both Node.js and browser based environments.

The Floodgate JavaScript SDK supports Node.js version 10+

## Installing

Navigate to your project folder

```console
npm install floodgate-javascript-sdk
```

## Usage

Below is a simple example of how you can use the JavaScript SDK to check on the status of a flag.

```javascript
import * as floodgate from "floodgate-javascript-sdk";

let client = floodgate.createClient("[YOUR ENVIRONMENT SDK KEY]");
client.GetValue("my-feature-flag", false, (value) => {
  if (value) {
    // Do something new and exciting
  }
  else {
    // Do whatever I usually do
  }
});
```

## Submitting issues

Sometimes everyone has issues! The Floodgate teams tracks all issues submitted to this [issue tracker](https://github.com/floodgate-io/javascript-sdk/issues). You are encouraged to use the issue tracker to report any bugs or submit your general feedback and feature enhancements. We will do our best to respond as quickly as possible.

## Contributing

We are always looking for talented engineers to join the Floodgate team. If you would like to contribue to our projects feel free to fork this project and when ready issue a PR back for review.

## About Floodgate

Floodgate is a remote feature management system designed to help engineering teams and product teams work independently. Using feature flags managed by Floodgate you will dramatically reduce the risks software companies face when releasing and deploying new features.

With Floodgate you can use fine grained user targeting to test out new features in your production environment with minimal impact and risk to your existing systems and customers. Floodgate provides a simple to use percentage rollout facility to allow you to perform canary releases with just a few clicks.

To learn more about Floodgate, visit us at https://floodgate.io or contact hello@floodgate.io. To get started with feature flags for free at https://app.floodgate.io/signup.

Floodgate has currently developed following SDKs.

* .Net Framework [GitHub](https://github.com/floodgate-io/dotnet-framework-sdk)
* JavaScript [GitHub](https://github.com/floodgate-io/javascript-sdk)

## Contributing a New SDK

If you would like to contribute to Floodgate's library of SDKs and create an SDK for a new language, feel free to drop us an email at hello@floodgate.io