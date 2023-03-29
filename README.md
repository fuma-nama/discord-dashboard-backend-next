[Go to Frontend](https://github.com/SonMooSans/discord-bot-dashboard-next)

# Discord Bot Dashboard Backend Demo

## Tech Stack

- Database (Prisma)
- Nest.js with Typescript
- Discord.js
- PnPM (Package Manager)

## Install Dependencies

Make sure you're using [pnpm](https://pnpm.io), in order to load the lock file

```
pnpm install
```

## Environment variables

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

## Create Prisma Migrate baseline

You need to create a migration baseline before deploying your app

1. **Reset Development database**

   ```
   prisma migrate dev
   ```

2. **Production database**

   ```
   prisma migrate resolve --applied 20230305142521_initial
   ```

[Learn More](https://pris.ly/d/migrate-baseline)

## Deploy

We recommend using https://railway.app to deploy your backend

You are able to host both your database and node.js server on Railway

<br/>

## File Structure

| Path                    | Description        |
| ----------------------- | ------------------ |
| `./src/bot`             | The Discord bot    |
| `./src/api`             | The API service    |
| `./src/api/controllers` | API controllers    |
| `./src/api/services`    | 3rd party services |

### Add a Feature

Create new routes in the guild controller

[Learn More](https://github.com/SonMooSans/discord-bot-dashboard-next#required-routes)

```ts
@Get('/features/welcome-message')
async getWelcomeMessage(@Param('guild') guild: string) {
   //Database calls

  return {
    message: 'message',
    channel: '1111',
  };
}

@Post('/features/welcome-message')
async enableWelcomeMessage(@Req() req: AuthRequest, @Param('guild') guild: string) {
   //Enables the feature

   return 'Success';
}

@Patch('/features/welcome-message')
async updateWelcomeMessage(
  @Req() req: AuthRequest,
  @Param('guild') guild: string,
  @Body() body: Partial<WelcomeMessage>,
) {
   //Update the feature

   return updated;
}

@Delete('/features/welcome-message')
async disableWelcomeMessage(@Param('guild') guild: string, @Req() req: AuthRequest) {
   //Disables the feature

   return 'Success';
}
```
