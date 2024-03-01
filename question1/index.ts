import { createTown } from "./main";

const town = createTown();
// Question 1a.
console.log("a. Write a function that returns all the possible paths between A­-H.")
console.log(town.getAllPaths());
// Question 1b.
console.log("b. Write a function that returns the shortest path between A­-H.")    
console.log(town.getShortestPath());
