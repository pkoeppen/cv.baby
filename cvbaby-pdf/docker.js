const fs = require('fs');
const os = require('os');
const dockerLambda = require('docker-lambda');
const config = require('./config.dev.json');

module.exports = { handler };

async function handler({ body }, context, callback) {
    // Parse environment variable arguments.
    const args = Object.keys(config).map(key => {
        return ['-e', `${key}=${config[key]}`]
    }).reduce((acc, cur) => acc.concat(cur));
    // Get AWS credentials.
    const {
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY
    } = await getAWSCredentials();
    args.push('-e', `AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}`);
    args.push('-e', `AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}`);
    // Add port mapping argument.
    args.push('-p', '3000:3000');
    const event = JSON.parse(body);
    const options = {
        event,
        dockerImage: 'lambci/lambda:nodejs8.10',
        handler: 'handler.renderPDF',
        dockerArgs: args,
        taskDir: `${__dirname}/tmp`
    }
    const response = dockerLambda(options);
    console.log('docker-lambda response:', JSON.stringify(response, null, 2));
}

async function getAWSCredentials() {
    const lines = (await new Promise((resolve, reject) => {
        fs.readFile(`${os.homedir()}/.aws/credentials`, 'utf-8', (error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    })).split('\n');
    const AWS_ACCESS_KEY_ID = lines.find(line =>
        /^AWS_ACCESS_KEY_ID/gi.test(line)).split('=')[1].trim();
    const AWS_SECRET_ACCESS_KEY = lines.find(line =>
        /^AWS_SECRET_ACCESS_KEY/gi.test(line)).split('=')[1].trim();
    if (!(AWS_ACCESS_KEY_ID && AWS_SECRET_ACCESS_KEY)) {
        throw new Error('Missing AWS credentials');
    }
    return {
        AWS_ACCESS_KEY_ID,
        AWS_SECRET_ACCESS_KEY
    };
}