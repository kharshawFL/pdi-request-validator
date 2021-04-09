# PDI Request Validator

A basic express server that will validate a request against the swagger spec file for PDI.

## Running the test server

```
npm install

npm start
```

Open browser to http://localhost:5555/api-docs for the swagger ui.  Change the Servers drop down to localhost.

You'll need to hit the authorize button.  I enter `bearer test` for auth info.  The request is NOT validated but you need something to satisfy the request validation.

Run your requests.  No sample payloads are returns.  If the request satisfies swagger you'll get a 200 OK.  If not, you'll see the error.

The `\samples` director has some sample payloads, maybe.  The filenames will try to be descriptive.  