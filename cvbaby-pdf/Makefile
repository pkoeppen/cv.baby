local:
	# Run Docker locally with shared folder /tmp
	rm -rf ./tmp
	mkdir -p tmp/node_modules/chrome-aws-lambda/
	cd tmp/ && npm install puppeteer-core@~1.17.0 --no-bin-links --no-optional --no-package-lock --no-save --no-shrinkwrap
	cd chrome-aws-lambda/ && npm pack
	tar --directory ./tmp/node_modules/chrome-aws-lambda/ --extract --file ./chrome-aws-lambda/chrome-aws-lambda-*.tgz --strip-components=1
	cp ./handler.js ./tmp/handler.js
	rm -f ./chrome-aws-lambda/chrome-aws-lambda-*.tgz

package:
	# Zip everything for deployment to AWS Lambda
	rm -f package.zip
	mkdir -p dist/node_modules/chrome-aws-lambda/
	cd dist/ && npm install puppeteer-core@~1.17.0 --no-bin-links --no-optional --no-package-lock --no-save --no-shrinkwrap
	cd chrome-aws-lambda/ && npm pack
	tar --directory ./dist/node_modules/chrome-aws-lambda/ --extract --file ./chrome-aws-lambda/chrome-aws-lambda-*.tgz --strip-components=1
	zip a -r package.zip ./dist/* ./handler.js
	rm -f ./chrome-aws-lambda/chrome-aws-lambda-*.tgz
	rm -rf ./dist