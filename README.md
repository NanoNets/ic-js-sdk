# NanoNets Image Classification Node.js SDK

The [NanoNets](https://nanonets.com) Image Classification (IC) Node.js SDK.

> NOTE:
>
> -   This package supports both CommonJS and ES Module systems.
> -   All API requests from the browser will fail due to CORS policies.
> -   API Keys have full access to the user's account. **Please do not expose API Keys on the client.**
>     -   Please note that compiling, obfuscating, minifying or bundling (for example in React.js, Angular, Vue.js, React Native, etc.) **does not** hide the API Key and **it can still be extracted from the final application**.
>     -   The API Key should only be known to the server code and all client requests to the API must go through a server.

## Installation

```
npm install @nanonets/image-classification
```

## Use the NanoNets SDK

> NOTE: A fully working example using the SDK can be found in the [example](example) directory.

1. Import/require the Image Classification package.

```javascript
// ES Modules
import ImageClassification from "@nanonets/image-classification";

// CommonJS
const ImageClassification = require("@nanonets/image-classification");
```

2. Instantiate the Image Classification (IC) class.

```javascript
const ic = new ImageClassification(apiKey, modelId);
```

> NOTE:
>
> -   The API Key can be found in the user's [NanoNets Account section](https://app.nanonets.com/#/keys) and Model ID can be found in the model's settings in the NanoNets web app.
> -   Models need to be created and trained from [the NanoNets web app](https://app.nanonets.com) before being able to make predictions.

3. Use the [Image Classification API](#image-classification-api) to get prediction results from the model(s).

## Image Classification API

### Table of Contents

-   [Class Instantiation (Constructor)](#class-instantiation-constructor-1)
-   [Get Model Details](#get-model-details-1)
-   [Predict Using URLs](#predict-using-urls-1)
-   [Predict Using File](#predict-using-file-1)

### Class Instantiation (Constructor)

```javascript
const ic = new ImageClassification(apiKey, modelId);
```

#### Parameters

-   `apiKey`
    -   Type: String
    -   Required: True
-   `modelId`
    -   Type: String
    -   Required: True

> NOTE:
>
> -   Class Instantiation is mandatory.
> -   The API Key can be found in the user's [NanoNets Account section](https://app.nanonets.com/#/keys) and Model ID can be found in the model's settings in the NanoNets web app.
> -   API Keys have full access to the user's account. **Please do not expose API Keys on the client.**
>     -   Please note that compiling, obfuscating, minifying or bundling (for example in React.js, Angular, Vue.js, React Native, etc.) **does not** hide the API Key and **it can still be extracted from the final application**.
>     -   The API Key should only be known to the server code and all client requests to the API must go through a server.

### Get Model Details

```javascript
await ic.getModelDetails();
```

[Response example and other details](https://nanonets.com/documentation/#operation/ImageCategorizationModelGet)

> The `getModelDetails` function returns a promise, so it needs to be awaited.

### Predict Using URLs

```javascript
await ic.predictUsingUrls(urlArray);
```

#### Parameters

-   `urlArray`
    -   Type: Array of Strings
    -   Required: True

[Response example and other details](https://nanonets.com/documentation/#operation/ImageCategorizationLabelUrlsPost2)

> The `predictUsingUrls` function returns a promise, so it needs to be awaited.

### Predict Using File

```javascript
await ic.predictUsingFile(filePath);
```

#### Parameters

-   `filePath`
    -   Type: String
    -   Required: True

[Response example and other details](https://nanonets.com/documentation/#operation/ImageCategorizationLabelFilePost)

> The `predictUsingFile` function returns a promise, so it needs to be awaited.
