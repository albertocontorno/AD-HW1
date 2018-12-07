import Graph from './Graph';
import QuickSort from './quick-sort/QuickSort.js';
import DisjointSet from './disjoint-set/DisjointSet.js';

/**
 * @param {Graph} graph
 * @return {Graph}
 */
export default function kruskal(graph, edge) {
  // It should fire error if graph is directed since the algorithm works only
  // for undirected graphs.
  if (graph.isDirected) {
    throw new Error('Kruskal\'s algorithms works only for undirected graphs');
  }

  // Init new graph that will contain minimum spanning tree of original graph.
  const minimumSpanningTree = new Graph();

  // Sort all graph edges in increasing order.
  const sortingCallbacks = {
    /**
     * @param {GraphEdge} graphEdgeA
     * @param {GraphEdge} graphEdgeB
     */
    compareCallback: (graphEdgeA, graphEdgeB) => {
      if (graphEdgeA.weight === graphEdgeB.weight) {
        return 1;
      }

      return graphEdgeA.weight <= graphEdgeB.weight ? -1 : 1;
    },
  };

  const sortedEdges = new QuickSort(sortingCallbacks).sort(graph.getAllEdges());

  //if a egde is indicated, we put it as the first of the edges with the same weight
  if(edge){
    let indexFirstWithSameWeight;
    let indexOfEdge;
    for(let i = 0; i<sortedEdges.length; i++){
      if(indexFirstWithSameWeight == null && sortedEdges[i].weight == edge.weight){
        indexFirstWithSameWeight = i;
      }
      if(indexOfEdge == null && sortedEdges[i].equals(edge)){
        indexOfEdge = i;
      }
    }
    if(indexOfEdge != indexFirstWithSameWeight){
      let tmp = sortedEdges[indexFirstWithSameWeight];
      sortedEdges[indexFirstWithSameWeight] = sortedEdges[indexOfEdge];
      sortedEdges[indexOfEdge] = tmp;
    }
  }

  // Create disjoint sets for all graph vertices.
  const keyCallback = graphVertex => graphVertex.getKey();
  const disjointSet = new DisjointSet(keyCallback);

  graph.getAllVertices().forEach((graphVertex) => {
    disjointSet.makeSet(graphVertex);
  });

  // Go through all edges started from the minimum one and try to add them
  // to minimum spanning tree. The criteria of adding the edge would be whether
  // it is forms the cycle or not (if it connects two vertices from one disjoint
  // set or not).
  for (let edgeIndex = 0; edgeIndex < sortedEdges.length; edgeIndex += 1) {
    /** @var {GraphEdge} currentEdge */
    const currentEdge = sortedEdges[edgeIndex];

    // Check if edge forms the cycle. If it does then skip it.
    if (!disjointSet.inSameSet(currentEdge.startVertex, currentEdge.endVertex)) {
      // Unite two subsets into one.
      disjointSet.union(currentEdge.startVertex, currentEdge.endVertex);

      // Add this edge to spanning tree.
      minimumSpanningTree.addEdge(currentEdge);
    }
  }

  return minimumSpanningTree;
}
