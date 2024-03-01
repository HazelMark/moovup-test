const main = require('./main');
let town = main.createTown();
test('Total of all paths equals 269', () => {
    expect(town.getAllPaths().length).toBe(269);
});
let paths = town.getShortestPath();
test('All shortest path from ea', () => {
    expect(["eda", "eha"]).toContain(paths["ea"]);
});
test('All shortest path from eb', () => {
    expect(["edb"]).toContain(paths["eb"]);
});
test('All shortest path from ec', () => {
    expect(["edc", "efc"]).toContain(paths["ec"]);
});
test('All shortest path from ed', () => {
    expect(["ed"]).toContain(paths["ed"]);
});
test('All shortest path from ef', () => {
    expect(["ef"]).toContain(paths["ef"]);
});
test('All shortest path from eg', () => {
    expect(["efg", "ehg"]).toContain(paths["eg"]);
});
test('All shortest path from eh', () => {
    expect(["eh"]).toContain(paths["eh"]);
});
//# sourceMappingURL=main.test.js.map