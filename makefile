install:
	npm install
	cd mock/ && npm install

development_stage:
	grunt development --target=stage
	nohup node mock/app.js &
	nohup node app.js &
	grunt watch --target=stage

development:
	grunt development
	nohup node mock/app.js &
	nohup node app.js &
	grunt watch

test:
	npm install
	npm install -g grunt
	npm install -g grunt-cli
	npm install -g karma
	npm install -g karma-phantomjs-launcher
	grunt development
	nohup nodejs app.js &
	npm test

production:
	node -e "require('grunt').tasks(['production']);"
	nohup nodejs app.js &

stage:
	- pkill -9 nodejs
	- pkill -9 node
	node -e "require('grunt').tasks(['stage']);"
	nohup nodejs app.js &
