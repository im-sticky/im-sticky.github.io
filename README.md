## Deploying

The base branch to work out of is `develop`, but switching into the `dist/` folder will automatically switch the working branch to `master` with a different set of commited files. The `dist/` folder is set as a `git worktree` for the `master branch`. To deploy a new version of the site run the following commands:

```
> npm run build
> cd dist
> git add -A
> git commit -m "new site build"
> git push origin master
> cd ..
```