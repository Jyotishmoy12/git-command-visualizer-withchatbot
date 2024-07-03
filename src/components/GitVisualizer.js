// src/components/GitVisualizer.js
import React, { useState } from 'react';
import CommandInput from './CommandInput';
import TreeView from './TreeView';
import GitChatbot from './GitChatbot';

const GitVisualizer = () => {
  const [treeData, setTreeData] = useState({
    name: 'main',
    attributes: { type: 'branch' },
    children: [],
  });
  const [currentBranch, setCurrentBranch] = useState('main');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleCommand = (command) => {
    setError('');
    setMessage('');
    try {
      const result = processCommand(command, treeData, currentBranch);
      setTreeData(result.tree);
      setCurrentBranch(result.currentBranch);
      setMessage(result.message);
    } catch (err) {
      setError(err.message);
    }
  };

  const resetVisual = () => {
    setTreeData({
      name: 'main',
      attributes: { type: 'branch' },
      children: [],
    });
    setCurrentBranch('main');
    setError('');
    setMessage('Visual reset to initial state');
  };

  return (
    <div className="git-visualizer">
      <h1>Git Command Visualizer</h1>
      <div className="command-section">
        <CommandInput onCommand={handleCommand} />
        <button onClick={resetVisual} className="reset-visual-button">
          Reset Visual
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {message && <p className="message">{message}</p>}
      <p className="current-branch">Current branch: {currentBranch}</p>
      <div className="visualizer-layout">
        <TreeView data={treeData} />
        <GitChatbot />
      </div>
    </div>
  );
};
// Helper functions
const findBranch = (tree, branchName) => {
  if (tree.name === branchName && tree.attributes.type === 'branch') {
    return tree;
  }
  for (let child of tree.children) {
    const found = findBranch(child, branchName);
    if (found) return found;
  }
  return null;
};

const addCommit = (branch, message) => {
  branch.children.push({
    name: message,
    attributes: {
      type: 'commit',
      hash: Math.random().toString(36).substr(2, 8),
    },
    children: [],
  });
};

const listBranches = (tree) => {
  const branches = [];
  const traverse = (node) => {
    if (node.attributes.type === 'branch') {
      branches.push(node.name);
    }
    node.children.forEach(traverse);
  };
  traverse(tree);
  return branches.join(', ');
};

const deleteBranch = (tree, branchName) => {
  const deleteRecursive = (node) => {
    node.children = node.children.filter(child => {
      if (child.name === branchName && child.attributes.type === 'branch') {
        return false;
      }
      deleteRecursive(child);
      return true;
    });
  };
  deleteRecursive(tree);
  return tree;
};

const processCommand = (command, currentTree, currentBranch) => {
  const [action, ...args] = command.split(' ');
  let newTree = JSON.parse(JSON.stringify(currentTree));
  let newCurrentBranch = currentBranch;
  let message = '';

  switch (action) {
    case 'init':
      newTree = {
        name: 'main',
        attributes: { type: 'branch' },
        children: [],
      };
      newCurrentBranch = 'main';
      message = 'Initialized empty Git repository';
      break;
    case 'commit':
      if (args[0] === '-a' && args[1] === '-m') {
        const commitMessage = args.slice(2).join(' ');
        const branch = findBranch(newTree, currentBranch);
        if (!branch) throw new Error(`Branch ${currentBranch} not found`);
        addCommit(branch, commitMessage);
        message = `Created commit: ${commitMessage}`;
      } else if (args[0] === '--amend') {
        const branch = findBranch(newTree, currentBranch);
        if (!branch) throw new Error(`Branch ${currentBranch} not found`);
        if (branch.children.length > 0) {
          branch.children[branch.children.length - 1].name += ' (amended)';
          message = 'Amended last commit';
        } else {
          throw new Error('No commit to amend');
        }
      } else {
        throw new Error('Invalid commit command');
      }
      break;
    case 'branch':
      if (args.length === 0) {
        message = `Current branches:\n${listBranches(newTree)}`;
      } else if (args[0] === '-D') {
        const branchToDelete = args[1];
        newTree = deleteBranch(newTree, branchToDelete);
        message = `Deleted branch ${branchToDelete}`;
      } else {
        const newBranchName = args[0];
        if (findBranch(newTree, newBranchName)) throw new Error(`Branch ${newBranchName} already exists`);
        const sourceBranch = findBranch(newTree, currentBranch);
        if (!sourceBranch) throw new Error(`Current branch ${currentBranch} not found`);
        sourceBranch.children.push({
          name: newBranchName,
          attributes: { type: 'branch' },
          children: [],
        });
        message = `Created branch ${newBranchName}`;
      }
      break;
    case 'checkout':
      if (args[0] === '-b') {
        const newBranchName = args[1];
        if (findBranch(newTree, newBranchName)) throw new Error(`Branch ${newBranchName} already exists`);
        const sourceBranch = findBranch(newTree, currentBranch);
        if (!sourceBranch) throw new Error(`Current branch ${currentBranch} not found`);
        sourceBranch.children.push({
          name: newBranchName,
          attributes: { type: 'branch' },
          children: [],
        });
        newCurrentBranch = newBranchName;
        message = `Created and switched to branch ${newBranchName}`;
      } else {
        const targetBranch = findBranch(newTree, args[0]);
        if (!targetBranch) throw new Error(`Branch ${args[0]} not found`);
        newCurrentBranch = args[0];
        message = `Switched to branch ${args[0]}`;
      }
      break;
    case 'merge':
      if (args.length === 0) throw new Error('Branch name to merge is required');
      const sourceBranchToMerge = findBranch(newTree, args[0]);
      if (!sourceBranchToMerge) throw new Error(`Branch ${args[0]} not found`);
      const targetBranchToMerge = findBranch(newTree, currentBranch);
      if (!targetBranchToMerge) throw new Error(`Current branch ${currentBranch} not found`);
      addCommit(targetBranchToMerge, `Merge branch '${args[0]}' into ${currentBranch}`);
      message = `Merged branch ${args[0]} into ${currentBranch}`;
      break;
    case 'push':
    case 'pull':
    case 'clone':
    case 'stash':
    case 'apply':
      message = `${action.charAt(0).toUpperCase() + action.slice(1)} operation simulated`;
      break;
    case 'rebase':
    case 'cherry-pick':
      addCommit(findBranch(newTree, currentBranch), `${action} operation`);
      message = `${action.charAt(0).toUpperCase() + action.slice(1)} operation simulated`;
      break;
    case 'reset':
      if (args[0] === '--hard') {
        const branch = findBranch(newTree, currentBranch);
        if (branch && branch.children.length > 0) {
          branch.children.pop();
          message = 'Hard reset performed';
        } else {
          throw new Error('No commits to reset');
        }
      } else {
        message = 'Reset operation simulated';
      }
      break;
    case 'revert':
      addCommit(findBranch(newTree, currentBranch), 'Revert commit');
      message = 'Revert operation simulated';
      break;
    case 'diff':
    case 'status':
    case 'add':
    case 'log':
    case 'show':
    case 'format-patch':
      message = `${action} command simulated (no visual change)`;
      break;
    default:
      throw new Error('Unsupported command');
  }

  return { tree: newTree, currentBranch: newCurrentBranch, message };
};

export default GitVisualizer;