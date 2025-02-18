Hey, thanks for your interest in this project! I really do appreciate you and the time you're spending on helping me make this better. Below you'll find the steps to get everything running your machine locally.

## Getting started

1. First, you'll want to make sure you have [Node](https://nodejs.org/en), [Git](https://git-scm.com/), [PNPM](https://pnpm.io/), and [Docker](https://www.docker.com/) installed.

2. Next, clone the repository.

```bash
git clone https://github.com/nulfrost/cartridge.git
```

3. Change directory into the cloned repository and install the dependencies

```bash
cd cartridge && pnpm install
```

4. Add the necessary environment variables

You should see a file called `.env.example`, rename it to just be `.env` and modify the contents of this file.

These environment variables should exist currently:

```bash
DATABASE_URL="postgresql://postgres:password@localhost:5432/cartridgedb?schema=public"
SESSION_SECRET=
```

For the `SESSION_SECRET` you'll just need to generate a new random key. You can do this by running this command in your terminal and pasting the result as the value: `openssl rand -base64 24`

5. Start the database and run the migrations

```bash
docker run --name cartdb -p 5432:5432 -e POSTGRES_PASSWORD=password -d postgres
```

Verify that it is running by using this command: `docker ps -a`

If it's running, proceed to the next step otherwise make sure it's in a running state first.

Run the migrations against your database

```bash
npx prisma db push
```

With all of this done, you should be good to run the app locally.

6. Run the project

In the root of the project directory, run the dev command: `pnpm dev`

The project will now be running and you can start playing around with it in your browser by visiting http://localhost:5173
