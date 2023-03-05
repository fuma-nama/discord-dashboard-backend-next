> **Frontend Repo** <br/> > https://github.com/SonMooSans/discord-bot-dashboard-next

# Discord Bot Dashboard Backend Demo

## Tech Stack

- Database (Prisma)
- Nest.js with Typescript
- Discord.js

## Configuration

You need some **Environment variables** in order to run it

### Database url

It is used for Prisma, I am using PostgreSQL but you may use any supported databases as well

`DATABASE_URL="postgresql://postgres:password@localhost:5432/my-db?schema=public"`

### Discord Bot Token

The bot token is also required

`BOT_TOKEN="YOUR_TOKEN"`

### Web URL

The `WEB_URL` is the default origin of the CORS configuration

```
WEB_URL="https://my-bot.vercel.app"
```

We will use `localhost:3000` in default

## Prisma

You should create a migration baseline before deploying your app

### Reset development database

```
pnpm prisma migrate dev
```

[Learn More](https://pris.ly/d/migrate-baseline)

# Deploy

We recommend using https://railway.app to deploy your backend

You are able to host both your database and node.js server on Railway

## PORT

The service will be running in port `8080`

If you planned to deploy the app on railway, please add an enironment variable:
| name | value |
| --- | --- |
| PORT | 8080 |

So that the service can be detected by railway (see [here](https://docs.railway.app/deploy/railway-up) for further information)
