# Contributing guidelines
Thank you for your interest in contributing to Origami! Here are a few pointers about how you can help.

## How to Contribute
Origami is one of CloudCV’s first open source projects that is  under very active development. We’re still working out the kinks to make contributing to this project as easy and transparent as possible, but we’re not quite there yet. Hopefully this document makes the process for contributing clear and answers some questions that you may have.

### Code of Conduct
Origami has adopted a Code of Conduct that we expect project participants to adhere to. Please read the [full text](https://github.com/Cloud-CV/Origami/blob/master/CODE_OF_CONDUCT.md) so that you can understand what actions will and will not be tolerated.

### Open Development
All work on Origami happens directly on GitHub. Both core team members and external contributors send pull requests which go through the same review process.


### Setting things up

To set up the development environment, follow the instructions in [README](https://github.com/Cloud-CV/Origami/blob/master/README.md).
You can also refer to the [Origami Documentation](http://cloudcv-origami.readthedocs.io/en/latest/).

### Finding something to work on

The issue tracker of Origami a good place to start. If you find something that interests you, comment on the thread and we’ll help get you started.

Alternatively, if you come across a new bug on the site, please file a new issue and comment if you would like to be assigned.If you would like to add a new feature to the repository, discuss with the mentors and upon discussion make a Pull Request for the same.

If you would like to work on an issue, drop in a comment at the issue. 

If it is already assigned to someone, but there is no sign of any work being done, please free to drop in a comment so that the issue can be assigned to you if the previous assignee has dropped it entirely.

If neither of these seem appealing, please post on our [Gitter channel](https://gitter.im/Cloud-CV/Origami) and we will help find you something else to work on.


### Your First Pull Request
Working on your first Pull Request? You can learn how from this free video series:

[How to Contribute to an Open Source Project on GitHub](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github)

To help you get your feet wet and get you familiar with our contribution process, we have a list of good first issues that contain bugs that have a relatively limited scope. This is a great place to get started.

If you decide to fix an issue, please be sure to check the comment thread in case somebody is already working on a fix. If nobody is working on it at the moment, please leave a comment stating that you intend to work on it so other people don’t accidentally duplicate your effort.

If somebody claims an issue but doesn’t follow up for more than two weeks, it’s fine to take it over but you should still leave a comment.


### Instructions to submit code

Before you submit code, please talk to us via the issue tracker so we know you are working on it.

Coding is done on feature branches and merged into it once stable and reviewed. To submit code, follow these steps:

### 1. Create a new branch off of master. Select a descriptive branch name.

        git fetch upstream
        git checkout master
        git merge upstream/master
        git checkout -b your-branch-name

### 2. Commit and push code to your branch:

   - Commits should be self-contained and contain a descriptive commit message.
   - Please make sure your code is well-formatted and adheres to PEP8 conventions (for Python) and the airbnb style guide (for JavaScript). For others (Lua, prototxt etc.) please ensure that the code is well-formatted and the style consistent.
   - Please ensure that your code is well tested.Run the following tests before creating a pull request :
	 * `python manage.py test`
	 * `yarn run test`

        
   - We highly encourage to use `autopep8` to follow the PEP8 styling. Run the following command before creating the pull request:

            autopep8 --in-place --exclude env,docs --recursive .     
            git commit -a -m “{{commit_message}}”
            git push origin {{branch_name}}
  - We use [`ESLint plugin for prettier`](https://github.com/prettier/eslint-plugin-prettier) for fomatting our front end code. Make sure to run the following command whenever you do any front-end related code changes :
  	 * `yarn run lint:fix`
  	
  
  
  Run the following command before creating the pull request:

            git commit -a -m “{{commit_message}}”
            git push origin {{branch_name}}
            
 If you have more than one commits in a single pull request make sure you squash your commits afterwards.
 When you're submitting a PR for a UI-related issue, it would be preferred if you add a screenshot of your change.
            
### 3. Creating a Pull Request

 On your Github fork, select your branch and click “New pull request”. Select “master” as the base branch and your branch in the “compare” dropdown.
 
If the code is mergeable (you get a message saying “Able to merge”), go ahead and create the pull request.
Check back after some time to see if the Travis checks have passed, if not you should click on “Details” link on your PR thread at the right of “The Travis CI build failed”, which will take you to the dashboard for your PR. You will see what failed / stalled, and will need to resolve them.

If your checks have passed, your PR will be assigned a reviewer who will review your code and provide comments. Please address each review comment by pushing new commits to the same branch (the PR will automatically update, so you don’t need to submit a new one). Once you are done, comment below each review comment marking it as “Done”. Feel free to use the thread to have a discussion about comments that you don’t understand completely or don’t agree with.

Once all comments are addressed, the reviewer will merge the PR.

**Congratulations, you have successfully contributed to Project Origami!**

So what are you waiting for? Go on and start contributing!  May the code be with you !

