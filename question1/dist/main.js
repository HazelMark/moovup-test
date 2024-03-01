"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTown = exports.Town = exports.Home = void 0;
class Home {
    constructor(name, base) {
        this.name = name;
        this.base = base;
    }
    setNeighbor(...house) {
        this.neighbor = house;
    }
    findPathRecur(house, path, results, steps, isfirst, target) {
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
exports.Home = Home;
class Town {
    setHome(...house) {
        this.nodes = house;
    }
    clearVisitor() {
        for (let idx in this.nodes) {
            this.nodes[idx].isVisit = undefined;
        }
    }
    getAllPaths() {
        let paths = [];
        for (let node of this.nodes) {
            for (let i = 1; i < this.nodes.length; i++) {
                paths = paths.concat(node.findPathRecur(node, node.name, [], i, true));
            }
        }
        return paths;
    }
    getShortestPath() {
        let shortestPath = {};
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
exports.Town = Town;
const createTown = () => {
    let town = new Town();
    let a = new Home("a", town);
    let b = new Home("b", town);
    let c = new Home("c", town);
    let d = new Home("d", town);
    let e = new Home("e", town);
    let f = new Home("f", town);
    let g = new Home("g", town);
    let h = new Home("h", town);
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
exports.createTown = createTown;
//# sourceMappingURL=main.js.map