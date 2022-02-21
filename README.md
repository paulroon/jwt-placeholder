# JWT Placeholder

A re-production of the ever populat jsonplaceholder that adds a JWT Auth layer. 

## Local Setup

You can run this in a local dev environment via:

```bash
npm run dev
```

### ENV Vars
You will need to set the enviroment var for the app secret to a value of your own choosing.
```bash 
ACCESS_TOKEN_SECRET=<APP_SECRET>
```

**note**: technically you dont need to do this as ```<APP_SECRET>``` will work as the secret / signature salt (it feels wrong) but in this app usecase theres no real security anyway.


## Usage

use the ```POST /login``` endpoint to 
```json
{
	"username": "<USERNAME>",
	"password": "<PASSWORD>"
}
```

The username you choose will become part of the generated jwt token payload. 
The Password will **ALWAYS** authenticate the user, unless the value ```"not_the_password"``` is given, which will simulate failure.

The JWT token is delivered in the response to this endpoint, for example: 
```json
{
	"access_token": "<TOKEN>"
}
```

All other endpoints are authenticated using the ```'Authorization'``` header. eg: 
```
Authorization: BEARER <TOKEN>
```
You can inspect the payload via

```GET /jwt/payload```

```json
{
	"name": "<USERNAME>",
	"iat": <INACTIVE_TIMESTAMP>
}
```
