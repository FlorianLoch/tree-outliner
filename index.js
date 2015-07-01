"use strict";

var VPIPE = "│";
var HPIPE = "─ ";
var BRANCH = "├";
var CURVE = "└";
var SPACE = "   ";

module.exports = {
  outline: outline,
  Node: Node
};

function outline(rootNode) {
  if (!rootNode) {
    console.log("Tree has no nodes! Not a single one :/");
    return "";
  }

  var out = "";
  write(rootNode.name);
  outlineRec("", rootNode.children);
  return out;

  function outlineRec(prefix, childNodes) {
    if (typeof childNodes === "undefined" || childNodes.length === 0) {
      return;
    }

    childNodes.forEach(function (item, index) {
      var symbol = isLast(index) ? CURVE : BRANCH;
      write(prefix + symbol + HPIPE + item.name);
      var newPrefix = prefix + ((isLast(index)) ? " " : VPIPE) + SPACE;
      outlineRec(newPrefix, item.children);
    });

    function isLast(index) {
      return (index + 1 === childNodes.length);
    }
  }

  function write(str) {
    out += str + "\n";
  }
}

//////// Node constructor /////////

function Node(name) {
  this.name = name;
  this.children = [];
}

Node.prototype.prependChild = function (node) {
  if (typeof node === "string") {
    node = new Node(node);
  }
  this.children.unshift(node);
  return this;
};

Node.prototype.appendChild = function (node) {
  if (typeof node === "string") {
    node = new Node(node);
  }
  this.children.push(node);
  return this;
};
