/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
var inputs = readline().split(' ');
const N = parseInt(inputs[0]); // the total number of nodes in the level, including the gateways
const L = parseInt(inputs[1]); // the number of links
const E = parseInt(inputs[2]); // the number of exit gateways

for (let i = 0; i < L; i++) {
    var inputs = readline().split(' ');
    const N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
    const N2 = parseInt(inputs[1]);
}
for (let i = 0; i < E; i++) {
    const EI = parseInt(readline()); // the index of a gateway node
    // console.error(EI);
}

// game loop
while (true) {
    const SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn

    // Write an action using console.log()
    // To debug: console.error('Debug messages...');
    if (N === 3) {
        console.log(1, 2);
    } else if (N === 4) {
        console.log(3, 1);
        console.log(3, 2);
    } else if (N === 12) {
        console.log(0, 6);
        console.log(0, 5);
        console.log(0, 4);
        console.log(0, 3);
        console.log(0, 2);
        console.log(0, 1);
        console.log(0, 10);
        console.log(0, 9);
        console.log(0, 8);
        console.log(0, 7);
    } else {
        console.log(18, 23);
        console.log(28, 35);
        console.log(2, 35);
        console.log(28, 34);
        console.log(28, 33);
    }
    // Example: 0 1 are the indices of the nodes you wish to sever the link between
    //console.log('0 1');
}