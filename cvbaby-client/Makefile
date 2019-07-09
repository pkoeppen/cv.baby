.PHONY: deploy
package:
	# Package files.
	rm -rf tmp/
	mkdir -p tmp/.nuxt/dist/
	cp -r .nuxt/dist/. tmp/.nuxt/dist/
	cp -r package.json nuxt.config.js config.$(env).json static/ i18n/ server/ deploy/* tmp/
	rm -f cvbaby-client-$(env).zip
	zip a -r cvbaby-client-$(env).zip tmp/.
	rm -rf tmp/
deploy:
	# Upload zip to S3.
	aws s3 cp cvbaby-client-$(env).zip s3://cvbaby-deployments
	# Deploy zip to EC2.
	aws deploy create-deployment \
		--application-name cvbaby \
		--deployment-config-name CodeDeployDefault.OneAtATime \
		--deployment-group-name cvbaby-$(env) \
		--s3-location bucket=cvbaby-deployments,bundleType=zip,key=cvbaby-client-$(env).zip
