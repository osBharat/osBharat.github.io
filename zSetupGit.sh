#!/usr/bin/env bash

git config --local pull.rebase true
git config --local push.default simple

# verifed from gpg
git config --local user.signingkey "osBharat@proton.me"
git config --local commit.gpgsign true  ## verify commits
# git config --local tag.gpgsign true   ## verify tags

# commit from user
git config --local user.name  "osBharat"
git config --local user.email "osBharat@proton.me"


# clone with "https" and push with "ssh" .. flexibility !!
repo=$(basename `pwd`) ## get directory name from the path
git remote set-url origin git@github.com:osBharat/$repo.git
