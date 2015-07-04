// You might need privileges for scanning system directories

"use strict";
var outline = require(__dirname + "/../index").outline;
var Node = require(__dirname + "/../index").Node;

var path = require("path");
var fs = require("fs");

function fileTree(dir, recursionDepth) {
  var MAX_RECURSION_DEPTH = recursionDepth || 2; //if set to 0 infinity is assumed
  var itemsFound = 0;
  var node = new Node(dir);
  fileTreeRec(dir, node, 0);

  function fileTreeRec(dir, node, depth) {
    if (depth === MAX_RECURSION_DEPTH && MAX_RECURSION_DEPTH !== 0) {
      return node.appendChild(new Node("..."));
    }

    var files = fs.readdirSync(dir);
    files.forEach(function (file) {
      itemsFound++;
      var childNode = new Node(file);
      var newPath = path.join(dir, file);
      if (fs.statSync(newPath).isDirectory()) {
        fileTreeRec(newPath, childNode, depth + 1);
      }
      node.appendChild(childNode);
    });
  }

  node.name = node.name + " (" + itemsFound + " items are listed)";
  return node;
}

console.log(outline(fileTree("/", 2)));
