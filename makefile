install:
	npm install
	cd mock/ && npm install

development:
	grunt development
	nohup node app.js &
	grunt watch

production:
	node -e "require('grunt').tasks(['production']);"
	nohup node mock/app.js &
	nohup node app.js &

stage:
	node -e "require('grunt').tasks(['stage']);"
	nohup node mock/app.js &
	nohup node app.js &

agus:
	node -e "require('grunt').tasks(['agus']);"
	node app.js
