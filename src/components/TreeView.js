// src/components/TreeView.js
import React, { useRef } from 'react';
import Tree from 'react-d3-tree';
import html2canvas from 'html2canvas';

const TreeView = ({ data }) => {
  const treeContainer = useRef(null);

  const renderNodeWithCustomEvents = ({ nodeDatum, toggleNode }) => (
    <g>
      <circle
        r={10}
        fill={nodeDatum.attributes.type === 'branch' ? '#2ecc71' : '#3498db'}
        onClick={toggleNode}
      />
      <text fill="#2c3e50" strokeWidth="1" x="20">
        {nodeDatum.name}
      </text>
      {nodeDatum.attributes.type === 'commit' && (
        <text fill="#7f8c8d" x="20" dy="20" fontSize="10">
          Hash: {nodeDatum.attributes.hash}
        </text>
      )}
    </g>
  );

  const downloadImage = () => {
    html2canvas(treeContainer.current).then((canvas) => {
      const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement('a');
      link.download = 'git-tree.png';
      link.href = image;
      link.click();
    });
  };

  return (
    <div className="tree-view">
      <div ref={treeContainer} style={{ width: '100%', height: '500px' }}>
        <Tree
          data={data}
          orientation="vertical"
          pathFunc="step"
          translate={{ x: 200, y: 50 }}
          separation={{ siblings: 1, nonSiblings: 2 }}
          renderCustomNodeElement={renderNodeWithCustomEvents}
          nodeSize={{ x: 200, y: 100 }}
        />
      </div>
      <button onClick={downloadImage} className="download-button">
        Download Diagram
      </button>
    </div>
  );
};

export default TreeView;