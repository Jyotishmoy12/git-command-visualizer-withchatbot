// src/components/CommandInput.js
import React, { useState } from 'react';

const CommandInput = ({ onCommand }) => {
  const [command, setCommand] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommand(command);
    setCommand('');
  };

  return (
    <form onSubmit={handleSubmit} className="command-input">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="Enter Git command"
      />
      <button type="submit">Execute</button>
    </form>
  );
};

export default CommandInput;