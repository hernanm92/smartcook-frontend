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
	- pkill -9 nodejs
	- pkill -9 node
	node -e "require('grunt').tasks(['stage']);"
	nohup nodejs app.js &
