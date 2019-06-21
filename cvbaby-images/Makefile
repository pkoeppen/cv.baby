dev:
	rm -rf ./tmp
	mkdir -p ./tmp
	npm install --prefix ./tmp --arch=x64 --platform=linux --target=8.10.0 sharp --no-optional --no-package-lock --no-save --no-shrinkwrap
	cp ./handler.js ./tmp/handler.js

prod:
	mkdir -p dist/
	npm install --prefix ./dist --arch=x64 --platform=linux --target=8.10.0 sharp --no-optional --no-package-lock --no-save --no-shrinkwrap
	zip a -r package.zip ./dist/* ./handler.js
	rm -rf ./dist
