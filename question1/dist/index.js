"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("./main");
const town = (0, main_1.createTown)();
// Question 1a.
console.log("a. Write a function that returns all the possible paths between A­-H.");
console.log(town.getAllPaths());
// Question 1b.
console.log("b. Write a function that returns the shortest path between A­-H.");
console.log(town.getShortestPath());
//# sourceMappingURL=index.js.map