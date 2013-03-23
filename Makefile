compile:
	tsc --out backbone.js src/backbone.ts

watch:
	tsc --out backbone.js src/backbone.ts --watch

cover: compile
	jscoverage backbone.js backbone.cover.js
	mocha-phantomjs -R json-cov cover-runner.html | json2htmlcov > cover.html
