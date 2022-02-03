### Git Workflow

1. In `main` branch, create a local branch to work on the ticket

```shell
$ git checkout -b US13-BuildSignInPage
```

On the branch name, "US" stands for "User Story" and it is followed by the number of user story. i.e., the branch is for the user story 13.

2.  Make sure you are on the newly created branch. Push the local branch to the remote Azure repository.

```shell
$ git push -u azure
```

3. On Azure DevOps, Link the pushed branch to your working ticket.

4. Make changes on the code base and stage the changes and commit the changes.

```shell
$ git add .

$ git commit -m "AddLayoutforSignInPage"
```

A commit message should start with a verb in the present tense, briefly describing what the code change is about.

You can make multiple commits before creating a PR (Pull Request).

5. Push the commits to the branch on remote (azure). Make sure you are on the right branch.

```shell
$ git push
```

6. Create a PR on Azure once finished developing for the ticket

On Azure Repo > Pull Requests page, You should be able to see "Create a pull request" button for the push

A Title for PR should align with the name of branch but does not need to be same word to word.

Once reviewed and approved, the branch will be merged to `main`.
