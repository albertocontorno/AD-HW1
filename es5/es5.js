import Graph from './Graph';
import GraphEdge from './GraphEdge';
import GraphVertex from './GraphVertex';
import kruskal from './kruskal.js'

//two graphs used as example
let graphA = new Graph();
let graphB = new Graph();

/////////// EXAMPLE1
let vertexA1 = new GraphVertex('A');
let vertexB1 = new GraphVertex('B');
let vertexC1 = new GraphVertex('C');
let vertexD1 = new GraphVertex('D');
let vertexE1 = new GraphVertex('E');
let vertexF1 = new GraphVertex('F');
let vertexG1 = new GraphVertex('G');
let vertexH1 = new GraphVertex('H');
let vertexI1 = new GraphVertex('I');
let vertexL1 = new GraphVertex('L');
let vertexM1 = new GraphVertex('M');

graphA.addVertex( vertexA1 );
graphA.addVertex( vertexB1 );
graphA.addVertex( vertexC1 );
graphA.addVertex( vertexD1 );
graphA.addVertex( vertexE1 );
graphA.addVertex( vertexF1 );
graphA.addVertex( vertexG1 );
graphA.addVertex( vertexH1 );
graphA.addVertex( vertexI1 );
graphA.addVertex( vertexL1 );
graphA.addVertex( vertexM1 );

graphA.addEdge( new GraphEdge(vertexA1, vertexB1, 2) );
graphA.addEdge( new GraphEdge(vertexA1, vertexC1, 1) );
let BC1 = new GraphEdge(vertexB1, vertexC1, 2); //it is included in a MST
graphA.addEdge( BC1 );
graphA.addEdge( new GraphEdge(vertexB1, vertexF1, 3) );
graphA.addEdge( new GraphEdge(vertexB1, vertexH1, 2) );
graphA.addEdge( new GraphEdge(vertexC1, vertexD1, 1) );
graphA.addEdge( new GraphEdge(vertexC1, vertexG1, 3) );
graphA.addEdge( new GraphEdge(vertexD1, vertexG1, 2) );
graphA.addEdge( new GraphEdge(vertexD1, vertexF1, 1) );
graphA.addEdge( new GraphEdge(vertexE1, vertexF1, 3) );
graphA.addEdge( new GraphEdge(vertexE1, vertexH1, 5) );
graphA.addEdge( new GraphEdge(vertexE1, vertexI1, 3) );
graphA.addEdge( new GraphEdge(vertexF1, vertexI1, 3) );
graphA.addEdge( new GraphEdge(vertexG1, vertexH1, 2) );
graphA.addEdge( new GraphEdge(vertexG1, vertexL1, 1) );
let HL1 = new GraphEdge(vertexH1, vertexL1, 100); //it is NOT included in a MST 
graphA.addEdge(HL1);
graphA.addEdge( new GraphEdge(vertexI1, vertexL1, 4) ); 
let LM1 = new GraphEdge(vertexL1, vertexM1, 100); //it is included in a MST
graphA.addEdge(LM1); 
console.log('GraphA = ',graphA)
//console.log(`Is e= ${BC1.getKey()} in MST -> ${testExistsMstWithEdge(graphA, BC1)}`);
console.log(MstWithEdge(graphA, HL1));

/////////// EXAMPLE2

let vertexA2 = new GraphVertex('A');
let vertexB2 = new GraphVertex('B');
let vertexC2 = new GraphVertex('C');
let vertexD2 = new GraphVertex('D');
let vertexE2 = new GraphVertex('E');
let vertexF2 = new GraphVertex('F');
let vertexG2 = new GraphVertex('G');
let vertexH2 = new GraphVertex('H');
let vertexI2 = new GraphVertex('I');

graphB.addVertex( vertexA2 );
graphB.addVertex( vertexB2 );
graphB.addVertex( vertexC2 );
graphB.addVertex( vertexD2 );
graphB.addVertex( vertexE2 );
graphB.addVertex( vertexF2 );
graphB.addVertex( vertexG2 );
graphB.addVertex( vertexH2 ); 
 
graphB.addEdge( new GraphEdge(vertexA2, vertexB2, 1) );
graphB.addEdge( new GraphEdge(vertexA2, vertexC2, 1) );
graphB.addEdge( new GraphEdge(vertexB2, vertexD2, 1) );
graphB.addEdge( new GraphEdge(vertexC2, vertexF2, 1) );
graphB.addEdge( new GraphEdge(vertexC2, vertexG2, 1) );
let FH2 = new GraphEdge(vertexF2, vertexH2, 2); //it is NOT included in a MST 
graphB.addEdge( FH2 );
graphB.addEdge( new GraphEdge(vertexG2, vertexH2, 1) ); 
let DH = new GraphEdge(vertexD2, vertexH2, 1); //it is included in a MST
graphB.addEdge( DH );
console.log('graphB = ', graphB);
console.log(MstWithEdge(graphB, FH2));


////// IMPLEMENTATION
function testExistsMstWithEdge(graph, edge){
  let startV = graph.getVertexByKey(edge.startVertex.value);
  let endV = graph.getVertexByKey(edge.endVertex.value);

  let edges = {};
  let weight = edge.weight;
  console.log('Start Vertex: ', startV.value, ' End vertex: ', endV.value, ' w:',weight);
  //build a new graph with only the edges with a weight < of the target edge.weight
  let residualGraph = new Graph();
  let newVerticesAdded = {};

  //callback for DFS first iteration: build the graph with only the edges with a weight < of the target edge.weight
  let selectEdgesFn = (neighbor, vertex, graph) => { 
    let edge = vertex.findEdge(neighbor); //get the edge between the current vertex and the neighbor
    if(!residualGraph.getVertexByKey(neighbor.value)){
      let newVertex = new GraphVertex(neighbor.value);
      newVerticesAdded[neighbor.value] = newVertex;
      residualGraph.addVertex(newVertex);
    }
    if(edge && !edges[edge.getKey()] && edge.weight < weight){ //if the edge have a weight < of the target edge.weight
      //create the new edge to be included in the new graph and add it to the graph
      let newEdge = new GraphEdge(
        newVerticesAdded[edge.startVertex.value] ? newVerticesAdded[edge.startVertex.value] : new GraphVertex(edge.startVertex.value),
        newVerticesAdded[edge.endVertex.value] ? newVerticesAdded[edge.endVertex.value] : new GraphVertex(edge.endVertex.value),
        edge.weight
      );
      residualGraph.addEdge(newEdge);
      edges[edge.getKey()] = edge;
    } 
  }
  let pathFound = false;
  //callback for DFS second iteration: find if the vertices of the target edge are connectec (there is a path?)
  let findIfPathFn = (neighbor, vertex, graph) => {
    if(neighbor.equals(endV)){
      pathFound = true;
    }
  }
  
  //first iteration -> O(|V|+|E|) 
  DFS_Iterative(graphA, startV, selectEdgesFn);
  //update end and start with the new true end end start of the residual graph
  endV = residualGraph.getVertexByKey(endV.value);
  startV = residualGraph.getVertexByKey(startV.value);
  //second iteration -> O(|V|+|E|)
  DFS_Iterative(residualGraph, startV, findIfPathFn);
  // O(|V|+|E|) + O(|V|+|E|) => O(|V|+|E|)
  return !pathFound;
}

function DFS_Iterative(graph, start, processFn){
  let stack = [];
  stack.push(start);
  let visited = {};
  while (stack.length > 0){
    let vertex = stack.pop();
    //console.log(vertex)
    if( !visited[vertex.value] ){
      visited[vertex.value] = true;
      let neighbours = vertex.getNeighbors();
      //console.log(vertex.value, neighbours)
      neighbours.forEach( neighbor => {
        if(processFn){ processFn(neighbor, vertex, graph); }
        stack.push(neighbor);
      });
    }
  }
}

function MstWithEdge(graph, e){
    if(testExistsMstWithEdge(graph,e)){
        console.log('There is a minimum spanning tree with e ', e.getKey())
        return kruskal(graph, e);
    } else {
        console.log('There is no minimum spanning tree that contain edge e');
        return null;
    }
}


