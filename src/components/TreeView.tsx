import { Typography } from "@mui/material";
import React, { useState } from "react";
import { ApplicationItem, TreeViewProps } from "../modals";

export const TreeView: React.FC<TreeViewProps> = ({ data, onSelect }) => {
  const [expandedNodes, setExpandedNodes] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleNode = (nodeName: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [nodeName]: !prev[nodeName],
    }));
  };

  const isLeafNode = (node: any) => {
    return Array.isArray(node);
  };

  const renderTree = (node: ApplicationItem[], nodeName: string) => {
    const isExpanded = expandedNodes[nodeName];

    return (
      <div key={nodeName} style={{ marginLeft: "20px" }}>
        <div
          onClick={() =>
            isLeafNode(node) ? onSelect(node) : toggleNode(nodeName)
          }
          style={{ cursor: "pointer" }}
        >
          {isLeafNode(node) ? (
            <span style={{ cursor: "pointer" }}>{nodeName}</span>
          ) : (
            <>
              {isExpanded ? "[-]" : "[+]"} {nodeName}
            </>
          )}
        </div>
        {isExpanded && !isLeafNode(node) && (
          <div>
            {Object.keys(node).map((key) => renderTree(node[key], key))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="tree-view">
      <Typography mb={2} variant="h6" component="h6">
        Naigation
      </Typography>
      {Object.keys(data).map((key) => renderTree(data[key], key))}
    </div>
  );
};
