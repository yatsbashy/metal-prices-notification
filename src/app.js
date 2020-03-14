const AWS = require("aws-sdk")
const axios = require("axios")

const region = "ap-northeast-1"
const secretsManager = new AWS.SecretsManager({ region: region })

const secretName = "metals-api"

const endpoint = "https://metals-api.com/api/latest"
const baseCurrency = "JPY"
const symbols = "XAU"

exports.lambdaHandler = async (event, context) => {
	try {
		const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise()
		const { accessKey } = JSON.parse(secretValue.SecretString)

		const url = `${endpoint}?access_key=${accessKey}&base=${baseCurrency}&symbols=${symbols}`
		const result = await axios.get(url)

		console.log(result)
	} catch (err) {
		console.log(err)
		return err
	}
}
