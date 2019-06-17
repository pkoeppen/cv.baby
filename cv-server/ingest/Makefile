%.zip:
	mkdir -p dist/
	npm install --prefix ./dist --arch=x64 --platform=linux --target=8.10.0 sharp --no-optional --no-package-lock --no-save --no-shrinkwrap
	zip a -r $@ ./dist/* ./handler.js
	rm -rf ./dist

