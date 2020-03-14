const AWS = require("aws-sdk")

const region = "ap-northeast-1"
const secretsManager = new AWS.SecretsManager({ region: region })

const secretName = "metals-api"

exports.lambdaHandler = async (event, context) => {
	try {
		const secretValue = await secretsManager.getSecretValue({ SecretId: secretName }).promise()
		const { accessKey } = JSON.parse(secretValue.SecretString)

		console.log(accessKey)
		return accessKey
	} catch (err) {
		console.log(err)
		return err
	}
}
