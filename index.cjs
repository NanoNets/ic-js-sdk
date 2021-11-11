const fs = require("fs");
const fetch = require("node-fetch-2");
const FormData = require("form-data");

class ImageClassification {
	constructor(apiKey, modelId) {
		if (!apiKey || !modelId)
			throw new Error(
				"NanoNets SDK Image Classification Constructor Error: Insufficient parameters passed."
			);
		else if (typeof apiKey !== "string" || typeof modelId !== "string")
			throw new Error(
				`NanoNets SDK Image Classification Constructor Error: Incorrect parameter data type. Expected 'string', got '${typeof apiKey}' and '${typeof modelId}'.`
			);
		else if (apiKey === "" || modelId === "")
			throw new Error(
				"NanoNets SDK Image Classification Constructor Error: Invalid API Key or Model ID. Empty string(s) passed."
			);

		this.apiKey = apiKey;
		this.modelId = modelId;
		this.authHeaderVal =
			"Basic " + Buffer.from(`${this.apiKey}:`).toString("base64");
	}

	async getModelDetails() {
		const response = await fetch(
			`https://app.nanonets.com/api/v2/ImageCategorization/Model/?modelId=${this.modelId}`,
			{
				headers: {
					"Authorization": this.authHeaderVal,
					"Accept": "application/json"
				}
			}
		);
		const data = response.json();

		return data;
	}

	async predictUsingUrls(urlArray) {
		if (!urlArray)
			throw new Error(
				"NanoNets SDK Image Classification predictUsingUrls() Error: URL array parameter not passed."
			);
		else if (!Array.isArray(urlArray))
			throw new Error(
				`NanoNets SDK Image Classification predictUsingUrls() Error: Incorrect parameter type. Expected 'array', got '${typeof urlArray}'.`
			);
		else if (urlArray.length === 0)
			throw new Error(
				"NanoNets SDK Image Classification predictUsingUrls() Error: Empty URL array passed."
			);

		let encodedData = new URLSearchParams();
		for (let i = 0; i < urlArray.length; i++) {
			encodedData.append("urls", urlArray[i]);
		}
		encodedData.append("modelId", this.modelId);

		const response = await fetch(
			`https://app.nanonets.com/api/v2/ImageCategorization/LabelUrls`,
			{
				method: "POST",
				headers: {
					"Authorization": this.authHeaderVal,
					"Content-Type": "application/x-www-form-urlencoded",
					"Accept": "application/json"
				},
				body: encodedData
			}
		);
		const data = response.json();

		return data;
	}

	async predictUsingFile(filePath) {
		if (!filePath)
			throw new Error(
				"NanoNets SDK Image Classification predictUsingFile() Error: File path parameter not passed."
			);
		else if (typeof filePath !== "string")
			throw new Error(
				`NanoNets SDK Image Classification predictUsingFile() Error: Incorrect parameter data type. Expected 'string', got '${typeof filePath}'.`
			);
		else if (filePath === "")
			throw new Error(
				`NanoNets SDK Image Classification predictUsingFile() Error: Empty file path passed.`
			);

		const fileStream = fs.createReadStream(filePath);

		const formData = new FormData();
		formData.append("file", fileStream);
		formData.append("modelId", this.modelId);

		const response = await fetch(
			`https://app.nanonets.com/api/v2/ImageCategorization/LabelFile`,
			{
				method: "POST",
				headers: {
					"Authorization": this.authHeaderVal,
					"Accept": "application/json"
				},
				body: formData
			}
		);
		const data = response.json();

		return data;
	}
}

module.exports = ImageClassification;
