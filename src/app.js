const AWS = require("aws-sdk")
const axios = require("axios")

const region = "ap-northeast-1"
const secretsManager = new AWS.SecretsManager({ region: region })

const secretName = "metals-api"

const endpoint = "https://metals-api.com/api/latest"
const baseCurrency = "JPY"
const symbols = new Map([
	["XAU", "金"],
	["XAG", "銀"],
	["XPT", "プラチナ"],
])
const joinedSymbols = Array.from(symbols.keys()).join(",")

exports.lambdaHandler = async (event, context) => {
	try {
		const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise()
		const { accessKey } = JSON.parse(secretValue.SecretString)

		const result = await axios.get(
			`${endpoint}?access_key=${accessKey}&base=${baseCurrency}&symbols=${joinedSymbols}`
		)

		console.log(result)
		return result.data
	} catch (err) {
		console.log(err)
		return err
	}
}
