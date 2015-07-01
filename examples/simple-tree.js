"use strict";

var outline = require(__dirname + "/../index").outline;
var Node = require(__dirname + "/../index").Node;

var tree = new Node("animals");
var mammals = new Node("mammals").appendChild("dolphins").appendChild("cows");
var reptiles = new Node("reptiles").appendChild("crocodiles").appendChild("snakes");
tree.appendChild(mammals).prependChild(reptiles);

//This could also be written as the following:
var plainTree = {
  name: "animals",
  children: [
    {
      name: "reptiles",
      children: [
        {
          name: "crocodiles"
        },
        {
          name: "snakes"
        }
      ]
    },
    {
      name: "mammals",
      children: [
        {
          name: "dolphins"
        },
        {
          name: "cows"
        }
      ]
    }
  ]
};

console.log("Via Node():");
console.log(outline(tree));

console.log("============\n");
console.log("Via plain object:");
console.log(outline(plainTree));
