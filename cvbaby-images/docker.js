const fs = require('fs');
const os = require('os');
const dockerLambda = require('docker-lambda');
const config = require('./config.dev.json');

module.exports = { handler };

async function handler({ body }) {
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

    const { base64Image, ...event } = JSON.parse(body);
    writeImageFile(base64Image);

    const options = {
        event,
        dockerImage: 'lambci/lambda:nodejs8.10',
        handler: 'handler.processImage',
        dockerArgs: args,
        taskDir: `${__dirname}/tmp`
    }

    const response = dockerLambda(options);
    console.log('docker-lambda response:', JSON.stringify(response, null, 2));
    return response;
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

function writeImageFile(base64Image) {
    // Save the image into the shared Docker folder.
    const file = new Buffer(base64Image, 'base64');
    fs.writeFileSync(`${__dirname}/tmp/image`, file);
}
