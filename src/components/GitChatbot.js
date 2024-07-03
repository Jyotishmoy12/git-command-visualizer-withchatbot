// src/components/GitChatbot.js
import React, { useState } from 'react';

const GitChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const gitCommandExplanations = {
    'init': 'Initializes a new Git repository. It creates a new .git directory in your current working directory, which will track all of your project\'s files and their history.',
    'commit': 'Records changes to the repository. Use -m to add a message describing what changed. The -a flag automatically stages files that have been modified and deleted.',
    'branch': 'Lists your branches. Add a <branch> argument to create a new branch with the name <branch>.',
    'checkout': 'Switches to another branch. Use -b <new-branch> to create a new branch and switch to it.',
    'merge': 'Incorporates changes from the named commits (since the time their histories diverged from the current branch) into the current branch.',
    'push': 'Updates remote refs along with associated objects. It\'s used to upload local repository content to a remote repository.',
    'pull': 'Fetches from and integrates with another repository or a local branch. In its default mode, it\'s shorthand for git fetch followed by git merge FETCH_HEAD.',
    'clone': 'Creates a copy of an existing Git repository. It\'s commonly used to get a copy of a remote repository onto your local machine.',
    'status': 'Shows the working tree status. Displays paths that have differences between the index file and the current HEAD commit, paths that have differences between the working tree and the index file, and paths in the working tree that are not tracked by Git.',
    'log': 'Shows the commit logs. It\'s used to display the recorded history of your repository.',
    'reset': 'Resets the current HEAD to the specified state. It\'s often used to undo changes or move the branch pointer to a different commit.',
    'revert': 'Creates a new commit that undoes all of the changes made in a previous commit, then applies it to the current branch.',
    'stash': 'Temporarily shelves changes you\'ve made to your working copy so you can work on something else, and then come back and re-apply them later on.',
    'cherry-pick': 'Applies the changes introduced by some existing commits. It\'s commonly used to move small chunks of work between branches.',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = { text: input, sender: 'user' };
    const botMessage = { text: getBotResponse(input), sender: 'bot' };
    setMessages([...messages, userMessage, botMessage]);
    setInput('');
  };

  const getBotResponse = (input) => {
    const command = input.toLowerCase().split(' ')[0];
    return gitCommandExplanations[command] || "I'm sorry, I don't have information about that command. Can you try another Git command?";
  };

  const resetChat = () => {
    setMessages([]);
    setInput('');
  };

  return (
    <div className="git-chatbot">
      <div className="chat-header">
        <h3>Git Chatbot</h3>
        <button onClick={resetChat} className="reset-button">Reset Chat</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about a Git command..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default GitChatbot;