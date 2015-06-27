const VPIPE = "│";
const HPIPE = "─ ";
const BRANCH = "├";
const CURVE = "└";
const SPACE = "   ";

function outline(tree) {
  if (!tree) {
    console.log("Tree has no nodes! Not a single one :/");
    return;
  }

  var out = "";
  outlineRec("", tree);
  return out;

  function outlineRec(prefix, childNodes) {
    if (typeof childNodes === "undefined" || childNodes.length === 0) return;

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

var tree = [{
  name: "root (/)",
  children: [
    {
      name: "home",
      children: [
        {
          name: "florian"
        },
        {
          name: "donald"
        },
        {
          name: "ronald"
        },
        {
          name: "root"
        }
      ]
    },
    {
      name: "var",
      children: [
        {
          name: "www"
        }
      ]
    }
  ]
}, {
  name: "Ain't exist"
}];

function Node(name) {
  this.name = name;
  this.children = [];
}

Node.prototype.prependChild = function (node) {
  this.children.unshift(node);
};

Node.prototype.appendChild = function (node) {
  this.children.push(node);
};

var stringifiedTree = outline(tree);
console.log(stringifiedTree);

////////////////////////////////

var path = require("path");
var fs = require("fs");

function fileTree(dir) {
  var node = new Node(dir);
  fileTreeRec(dir, node);

  function fileTreeRec(dir, node) {
    var files = fs.readdirSync(dir);
    files.forEach(function (file, index) {
      var childNode = new Node(file);
      var newPath = path.join(dir, file);
      if (fs.statSync(newPath).isDirectory()) {
        fileTreeRec(newPath, childNode);
      }
      node.appendChild(childNode);
    });
  }

  return node;
}

console.log(outline([fileTree(__dirname)]));
