install:
	npm install
	cd mock/ && npm install

development:
	grunt development
	nohup node mock/app.js &
	nohup node app.js &
	grunt watch

production:
	node -e "require('grunt').tasks(['production']);"
	nohup nodejs app.js &

stage:
	node -e "require('grunt').tasks(['stage']);"
	nohup node mock/app.js &
	nohup node app.js &
