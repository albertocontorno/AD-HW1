//import kruskal from './javascript-algorithms-master/src/algorithms/graph/kruskal';
import Graph from './Graph';
import GraphEdge from './GraphEdge';
import GraphVertex from './GraphVertex';
import kruskal from './kruskal.js'
import depthFirstSearch from './depth-first-search/depthFirstSearch'
let graphA = new Graph();
let graphB = new Graph();


let vertexA = new GraphVertex('A');
let vertexB = new GraphVertex('B');
let vertexC = new GraphVertex('C');
let vertexD = new GraphVertex('D');
let vertexE = new GraphVertex('E');
let vertexF = new GraphVertex('F');
let vertexG = new GraphVertex('G');
let vertexH = new GraphVertex('H');
let vertexI = new GraphVertex('I');
let vertexL = new GraphVertex('L');

/////////// EXAMPLE1
graphA.addVertex( vertexA );
graphA.addVertex( vertexB );
graphA.addVertex( vertexC );
graphA.addVertex( vertexD );
graphA.addVertex( vertexE );
graphA.addVertex( vertexF );
graphA.addVertex( vertexG );
graphA.addVertex( vertexH );
graphA.addVertex( vertexI );
graphA.addVertex( vertexL );

graphA.addEdge( new GraphEdge(vertexA, vertexB, 2) );
graphA.addEdge( new GraphEdge(vertexA, vertexC, 1) );
let BC = new GraphEdge(vertexB, vertexC, 2)
graphA.addEdge( BC );
graphA.addEdge( new GraphEdge(vertexB, vertexF, 3) );
graphA.addEdge( new GraphEdge(vertexB, vertexH, 2) );
graphA.addEdge( new GraphEdge(vertexC, vertexD, 1) );
graphA.addEdge( new GraphEdge(vertexC, vertexG, 3) );
graphA.addEdge( new GraphEdge(vertexD, vertexG, 2) );
graphA.addEdge( new GraphEdge(vertexD, vertexF, 1) );
graphA.addEdge( new GraphEdge(vertexE, vertexF, 3) );
graphA.addEdge( new GraphEdge(vertexE, vertexH, 5) );
graphA.addEdge( new GraphEdge(vertexE, vertexI, 3) );
graphA.addEdge( new GraphEdge(vertexF, vertexI, 3) );
graphA.addEdge( new GraphEdge(vertexG, vertexH, 2) );
graphA.addEdge( new GraphEdge(vertexG, vertexL, 1) );
graphA.addEdge( new GraphEdge(vertexH, vertexL, 3) );
graphA.addEdge( new GraphEdge(vertexI, vertexL, 4) ); 


let MST_A = kruskal(graphA, BC);
let valueMST = 0;
for (let k in MST_A.edges){
  valueMST += MST_A.edges[k].weight;
}

console.log('\nExample1 --> grafo (value mst='+valueMST+'):', MST_A)
console.log('');
/////////// EXAMPLE2
graphB.addVertex( vertexA );
graphB.addVertex( vertexB );
graphB.addVertex( vertexC );
graphB.addVertex( vertexD );
graphB.addVertex( vertexE );
graphB.addVertex( vertexF );
graphB.addVertex( vertexG );
graphB.addVertex( vertexH );

graphB.addEdge( new GraphEdge(vertexA, vertexB, 1) );
graphB.addEdge( new GraphEdge(vertexA, vertexC, 1) );
graphB.addEdge( new GraphEdge(vertexB, vertexD, 1) );
graphB.addEdge( new GraphEdge(vertexC, vertexF, 1) );
graphB.addEdge( new GraphEdge(vertexC, vertexG, 1) );
graphB.addEdge( new GraphEdge(vertexF, vertexH, 1) );
graphB.addEdge( new GraphEdge(vertexG, vertexH, 1) );
let DH = new GraphEdge(vertexD, vertexH, 1);
graphB.addEdge( DH );

//////
let MST_A = kruskal(graphB, DH);
let valueMST = 0;
for (let k in MST_A.edges){
  valueMST += MST_A.edges[k].weight;
}

console.log('\n',valueMST, MST_A);
//console.log(kruskal(graph))

/* let dfsGraph = depthFirstSearch(graph, vertexA);
console.log(dfsGraph); */