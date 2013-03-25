compile:
	tsc --out backbone.js src/backbone.ts

compile-test:
	tsc test/*.ts
	cat test/*.js > all-tests.js
	rm test/*.js
	rm src/*.js

cover: compile compile-test
	jscoverage backbone.js backbone.cover.js
	mocha-phantomjs -R json-cov cover-runner.html | json2htmlcov > cover.html
