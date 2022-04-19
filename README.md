## Local dev

The website is built using [Next.js](https://nextjs.org/). To run local development server:

```
npm install
npm run dev
```

## Deploying

Deploying is managed through a single `npm` command that builds a static version of the site and deploys as a subtree to the `gh-pages` branch.

```
git checkout develop
npm run deploy
```

This has the side effect of creating a new commit on the develop branch that will also need to be pushed.
