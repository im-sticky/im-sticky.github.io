## Deploying

The base branch to work out of is `develop`, but switching into the `out/` folder will automatically switch the working branch to `master` with a different set of commited files. The `out/` folder is set as a `git worktree` for the `master branch`. To deploy a new version of the site run the following commands:

```
> npm run build
> cd out
> git add -A
> git commit -m "new site build"
> git push origin master
> cd ..
```

To add a `git worktree` from a newly cloned repo, run `git worktree ./out/ master` from the root of the repository while the `out` folder does not exist.
