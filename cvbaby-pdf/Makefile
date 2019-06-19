dev:
	mkdir -p node_modules/chrome-aws-lambda/ && mkdir -p tmp
	npm install puppeteer-core@~1.17.0 --no-bin-links --no-optional --no-package-lock --no-save --no-shrinkwrap
	cd chrome-aws-lambda/ && npm pack
	tar --directory ./node_modules/chrome-aws-lambda/ --extract --file ./chrome-aws-lambda/chrome-aws-lambda-*.tgz --strip-components=1
	rm -f ./chrome-aws-lambda/chrome-aws-lambda-*.tgz

%.zip:
	mkdir -p dist/node_modules/chrome-aws-lambda/
	cd dist/ && npm install puppeteer-core@~1.17.0 --no-bin-links --no-optional --no-package-lock --no-save --no-shrinkwrap
	cd chrome-aws-lambda/ && npm pack
	tar --directory ./dist/node_modules/chrome-aws-lambda/ --extract --file ./chrome-aws-lambda/chrome-aws-lambda-*.tgz --strip-components=1
	zip a -r $@ ./dist/* ./handler.js
	rm -f ./chrome-aws-lambda/chrome-aws-lambda-*.tgz
	rm -rf ./dist

