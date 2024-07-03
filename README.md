
---
**1. `git init`**
   - **Command:** `init`
   - **Visual:** A single green circle labeled "main" appears.
   - **Message:** "Initialized empty Git repository"

---

**2. `git commit -a -m "Initial commit"`**
   - **Command:** `commit -a -m "Initial commit"`
   - **Visual:** A blue circle appears below the "main" branch, connected by a line, labeled "Initial commit" with a hash below it.
   - **Message:** "Created commit: Initial commit"

---

**3. `git branch feature`**
   - **Command:** `branch feature`
   - **Visual:** A new green circle appears, branching off from "main", labeled "feature".
   - **Message:** "Created branch feature"

---

**4. `git checkout feature`**
   - **Command:** `checkout feature`
   - **Visual:** No change in the tree, but the "Current branch" text updates.
   - **Message:** "Switched to branch feature"

---

**5. `git commit -a -m "Add new feature"`**
   - **Command:** `commit -a -m "Add new feature"`
   - **Visual:** A new blue circle appears below the "feature" branch, labeled "Add new feature" with a hash.
   - **Message:** "Created commit: Add new feature"

---

**6. `git checkout main`**
   - **Command:** `checkout main`
   - **Visual:** No change in the tree, but the "Current branch" text updates back to "main".
   - **Message:** "Switched to branch main"

---

**7. `git merge feature`**
   - **Command:** `merge feature`
   - **Visual:** A new blue circle appears below the "main" branch, labeled "Merge branch 'feature' into main" with a hash.
   - **Message:** "Merged branch feature into main"

---

**8. `git branch -D feature`**
   - **Command:** `branch -D feature`
   - **Visual:** The "feature" branch (green circle) disappears from the tree.
   - **Message:** "Deleted branch feature"

---

**9. `git commit --amend`**
   - **Command:** `commit --amend`
   - **Visual:** The last commit on the current branch (main) is updated to show "(amended)" in its label.
   - **Message:** "Amended last commit"

---

**10. `git reset --hard HEAD~1`**
    - **Command:** `reset --hard HEAD~1`
    - **Visual:** The last commit (blue circle) on the current branch is removed.
    - **Message:** "Hard reset performed"

---

**11. `git revert HEAD`**
    - **Command:** `revert HEAD`
    - **Visual:** A new blue circle appears on the current branch, labeled "Revert commit" with a hash.
    - **Message:** "Revert operation simulated"

---

**12. `git checkout -b new-feature`**
    - **Command:** `checkout -b new-feature`
    - **Visual:** A new green circle appears, branching off from the current position, labeled "new-feature". The "Current branch" text updates.
    - **Message:** "Created and switched to branch new-feature"

---

**13. `git cherry-pick main`**
    - **Command:** `cherry-pick main`
    - **Visual:** A new blue circle appears on the "new-feature" branch, labeled "cherry-pick operation" with a hash.
    - **Message:** "Cherry-pick operation simulated"

---

**14. `git rebase main`**
    - **Command:** `rebase main`
    - **Visual:** A new blue circle appears on the "new-feature" branch, labeled "rebase operation" with a hash.
    - **Message:** "Rebase operation simulated"

---

**15. `git status`**
    - **Command:** `status`
    - **Visual:** No change in the tree.
    - **Message:** "status command simulated (no visual change)"

---

**16. `git push origin new-feature`**
    - **Command:** `push origin new-feature`
    - **Visual:** No change in the tree.
    - **Message:** "Push operation simulated"

---

**17. `git pull origin main`**
    - **Command:** `pull origin main`
    - **Visual:** No change in the tree.
    - **Message:** "Pull operation simulated"

---

**18. `git stash`**
    - **Command:** `stash`
    - **Visual:** No change in the tree.
    - **Message:** "Stash operation simulated"

---

**19. `git stash pop`**
    - **Command:** `stash pop`
    - **Visual:** No change in the tree.
    - **Message:** "Apply operation simulated"

---

**20. `git branch`**
    - **Command:** `branch`
    - **Visual:** No change in the tree.
    - **Message:** "Current branches: main, new-feature"

---

Chatbot commands:
---

**1. `git init`**  
   - **Description:** Initializes a new Git repository. It creates a new `.git` directory in your current working directory, which will track all of your project’s files and their history.

**2. `git commit`**  
   - **Description:** Records changes to the repository. Use `-m` to add a message describing what changed. The `-a` flag automatically stages files that have been modified and deleted.

**3. `git branch`**  
   - **Description:** Lists your branches. Add a `<branch>` argument to create a new branch with the name `<branch>`.

**4. `git checkout`**  
   - **Description:** Switches to another branch. Use `-b <new-branch>` to create a new branch and switch to it.

**5. `git merge`**  
   - **Description:** Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch.

**6. `git push`**  
   - **Description:** Updates remote refs along with associated objects. It’s used to upload local repository content to a remote repository.

**7. `git pull`**  
   - **Description:** Fetches from and integrates with another repository or a local branch. In its default mode, it’s shorthand for `git fetch` followed by `git merge FETCH_HEAD`.

**8. `git clone`**  
   - **Description:** Creates a copy of an existing Git repository. It’s commonly used to get a copy of a remote repository onto your local machine.

**9. `git status`**  
   - **Description:** Shows the working tree status. Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the working tree and the index file, and paths in the working tree that are not tracked by Git.

**10. `git log`**  
    - **Description:** Shows the commit logs. It’s used to display the recorded history of your repository.

**11. `git reset`**  
    - **Description:** Resets the current HEAD to the specified state. It’s often used to undo changes or move the branch pointer to a different commit.

**12. `git revert`**  
    - **Description:** Creates a new commit that undoes all of the changes made in a previous commit, then applies it to the current branch.

**13. `git stash`**  
    - **Description:** Temporarily shelves changes you’ve made to your working copy so you can work on something else, and then come back and re-apply them later on.

**14. `git cherry-pick`**  
    - **Description:** Applies the changes introduced by some existing commits. It’s commonly used to move small chunks of work between branches.

