# Daily AI Comics

Hey 👋 Thanks for checking out Daily AI Comics source. This is an experiment in using ChatGPT and Stable Diffusion to generate daily comics. 

- We use [Wasp](http://wasp-lang.dev) to build the site and deploy it to Fly.io.
- We use [Replicate](http://replicate.com) to generate images
- We use [Cloudflare R2](https://www.cloudflare.com/en-gb/products/r2/) for image storage

### Running it locally

Copy `.env.example` to `.env.server` and fill in the values.

You'll need a PostgreSQL running locally. You can use Docker to run one:

```bash
docker run --name daily-ai-comics-postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
```

Make sure you have Wasp installed ([installing Wasp](https://wasp-lang.dev/docs#2-installation)), then run:

```bash
wasp db migrate-dev
```

and then:

```bash
wasp start
```

### Deploying to FLy.io

Make sure you have the Fly CLI installed, then run:

```bash
wasp deploy fly launch <name> <region> # first time
```

```bash
wasp deploy fly deploy # subsequent times
```
