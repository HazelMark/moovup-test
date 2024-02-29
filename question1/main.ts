interface House {
  name: string;
  base: Graph;
  neighbor: House[];
  isVisit?: boolean;

  findPathRecur: (house: House, path: string, results: string[], steps: number, isfirst: boolean, target?: string) => string[];
}

type Path = {
  [key: string]: string;
};

interface Graph {
  nodes: House[];
  clearVisitor: () => void;
  getAllPaths: () => string[];
  getShortestPath(): Path;
}

class Home implements House {
  name: string;
  neighbor: House[];
  base: Graph;
  isVisit?: boolean;

  constructor(name: string, base: Graph) {
    this.name = name;
    this.base = base;
  }

  setNeighbor(...house: House[]) {
    this.neighbor = house;
  }
  findPathRecur(house: House, path: string, results: string[], steps: number, isfirst: boolean, target?: string) {
    // Exit case
    // console.log(path, steps, house.name, "==", target, results);
    if (steps === 0) {
      results.push(path);
      return results;
    }

    if (house.neighbor.length > 0) {
      steps -= 1;
      for (let neighbor of house.neighbor) {
        if (isfirst) {
          house.base.clearVisitor();
        }

        // Nodes can be visited only once
        if (!neighbor.isVisit && path.indexOf(neighbor.name) === -1) {
          neighbor.isVisit = true;
          this.findPathRecur(neighbor, path + neighbor.name, results, steps, false, target);
          // console.log("--", results);

          let lastPath = results[results.length - 1];
          if (target !== undefined && lastPath.charAt(lastPath.length - 1) === target) {
            break;
          }
        }
      }
    }

    return results;
  }
}

class Town implements Graph {
  nodes: House[];
  base: Graph;

  setHome(...house: House[]) {
    this.nodes = house;
  }

  clearVisitor() {
    for (let idx in this.nodes) {
      this.nodes[idx].isVisit = undefined;
    }
  }

  getAllPaths() {
    let paths: string[] = [];
    for (let node of this.nodes) {
      for (let i = 1; i < this.nodes.length; i++) {
        paths = paths.concat(node.findPathRecur(node, node.name, [], i, true));
      }
    }

    return paths;
  }

  getShortestPath() {
    let shortestPath: Path = {};
    for (let node of this.nodes) {
      for (let toMeet of this.nodes.map((x) => x.name).filter((y) => y !== node.name)) {
        let found = false;
        for (let i = 1; i < this.nodes.length && !found; i++) {
          let paths = node.findPathRecur(node, node.name, [], i, true, toMeet);
          let lastPath = paths[paths.length - 1];

          found = lastPath.charAt(lastPath.length - 1) === toMeet;
          if (found) {
            shortestPath[node.name + toMeet] = lastPath;
          }
        }
      }
    }

    return shortestPath;
  }
}

const createTown = () => {
  let town: Town = new Town();

  let a: Home = new Home("a", town);
  let b: Home = new Home("b", town);
  let c: Home = new Home("c", town);
  let d: Home = new Home("d", town);
  let e: Home = new Home("e", town);
  let f: Home = new Home("f", town);
  let g: Home = new Home("g", town);
  let h: Home = new Home("h", town);

  a.setNeighbor(b, d, h);
  b.setNeighbor(a, c, d);
  c.setNeighbor(b, d, f);
  d.setNeighbor(a, b, c, e);
  e.setNeighbor(d, f, h);
  f.setNeighbor(c, e, g);
  g.setNeighbor(f, h);
  h.setNeighbor(a, e, g);

  town.setHome(a, b, c, d, e, f, g, h);
  return town;
};

const town = createTown();
// Question 1a.
console.log(town.getAllPaths());
// Question 1b.
console.log(town.getShortestPath());
