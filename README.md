# vuejs-with-axios

VueJs 2.0 with Axios - request cancellations and progress tracking

# whattathis

Spin up that JSON server with a little bitta delay

json-server --watch db.json --delay 2000

Run that frontend fuff

npm run serve

navigate to http://localhost:8080

# whywhy

We gotta cancel XHR requests if users click around like monkeys :)

For example - re-requesting the same data; double posting; or blowing it away by navigating to a different route.

It's also nice to show a progress bar, some things take long, depending on how good your backend developers are :)

# techstack

vuejs2.0 + router, typescript, axios, json-server, vue-progressbar
