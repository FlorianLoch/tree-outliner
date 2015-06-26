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

  function outlineRec(prefix, node) {
    if (typeof node === "undefined") return;

    node.forEach(function (item, index) {
      var symbol = isLast(index) ? CURVE : BRANCH;
      write(prefix + symbol + HPIPE + item.name);
      var newPrefix = prefix + ((isLast(index)) ? " " : VPIPE) + SPACE;
      outlineRec(newPrefix, item.children);
    });

    function isLast(index) {
      return (index + 1 === node.length);
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

var stringifiedTree = outline(tree);
console.log(stringifiedTree);
