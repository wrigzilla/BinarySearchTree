//left child node is always less than the current data, right is greater.  Cannot have duplicate data values.

namespace BinaryTree
{
	export interface INodeData
	{
		id: number;
	}

	export class SearchResult
	{
		constructor(
			public parent: Node,
			public child: Node,
			public fork: number
		)
		{ }
	}

	export class Node
	{
		constructor(
			public data: INodeData,
			public left: Node = null,
			public right: Node = null
		)
		{}
	}

	export class BinarySearchTree
	{
		//static members
		public static NODE_EMPTY: number = 0;
		public static NODE_LEFT: number = 1;
		public static NODE_RIGHT: number = 2;

		//public members
		public length: number = 0;

		constructor(
			private root: Node = null
		)
		{ }

		//static methods
		public static fromArray(list: Array<INodeData>): BinarySearchTree
		{
			var tree = new BinarySearchTree();
			list.forEach((x) => tree.add(x));
			return tree;
		}

		//public methods
		public add(data: INodeData): Node
		{
			this.length++;
			if (this.root === null) return this.root = new Node(data);
			var currentNode: Node = this.root;
			var parent: Node = null;

			while (currentNode)
			{
				parent = currentNode;
				if (this.compareNodeToData(currentNode, data) === BinarySearchTree.NODE_LEFT)
				{
					currentNode = currentNode.left;
					if (currentNode === null)
					{
						return parent.left = new Node(data);
					}
				}
				else if (this.compareNodeToData(currentNode, data) === BinarySearchTree.NODE_RIGHT)
				{
					currentNode = currentNode.right;
					if (currentNode === null)
					{
						return parent.right = new Node(data);
					}
				}
			}
			
		}

		public find(id: number, strat: Function = null): SearchResult
		{
			var result: Node = null;
			var parent: Node = null;

			var findId: Function = (node: Node, id: number): SearchResult =>
			{
				if (node.left !== null)
				{
					parent = node;
					if (node.left.data.id === id)
					{
						result = node.left;
						if (strat !== null)
						{
							strat(node, BinarySearchTree.NODE_LEFT);
						}
						return new SearchResult(parent, result, BinarySearchTree.NODE_LEFT);
					}
					findId(node.left, id);
				}
				if (node.right !== null)
				{
					parent = node;
					if (node.right.data.id === id)
					{
						result = node.right;
						if (strat !== null)
						{
							strat(node, BinarySearchTree.NODE_RIGHT);
							return new SearchResult(parent, result, BinarySearchTree.NODE_RIGHT);
						}
					}
					findId(node.right, id);
				}
			}

			findId(this.root, id);


			//balls this will need some sorting out or a refactor of this entire search methodology
			//return new SearchResult(parent, result);
		}

		public remove(id: number)
		{
			//var removeLeftOrRightNode: Function = (x: Node, type): Node =>
			//{
			//	if (type === BinarySearchTree.NODE_LEFT) x.left = null;
			//	if (type === BinarySearchTree.NODE_RIGHT) x.right = null;
			//	return x;
			//};
			//var results = this.find(id, removeLeftOrRightNode);
			//this.length = this.toArray().length;
			//return removedNode;

			this.find(id);


			//will need to recalculate the length after removal
			//could maybe optimize by -- but not sure what kind of wank this will unleash
			this.length = this.toArray().length;
		}

		public balance(): void
		{
			//optimize tree for searching
		}

		public toArray(): Array<any>
		{
			var list = [];
			var addToArray: Function = (node: Node) => { list.push(node.data.id); };
			this.traverseAll(this.root, addToArray);
			return list;
		}

		public toString(): string
		{
			return this.toArray().join(",");
		}

		//private methods
		private compareNodeToData(node: Node, data: INodeData): number
		{
			if (data.id <= node.data.id) return BinarySearchTree.NODE_LEFT;
			if (data.id > node.data.id) return BinarySearchTree.NODE_RIGHT;
		}

		private traverseAll(node: Node, strategy: Function)
		{
			strategy(node);
			if (node.left !== null)
			{
				this.traverseAll(node.left, strategy);
			}
			if (node.right !== null)
			{
				this.traverseAll(node.right, strategy);
			}
		}

		public height(): number[]
		{
			//this sucks balls, perhaps this should be better

			var heights: Array<number> = [];

			var height: number = 0;
			var all = (node: Node) =>
			{
				height++;
				console.log(node, height, node.left === null, node.right === null);
				if (node.left === null && node.right === null)
				{
					heights.push(height);
					height = 0;
				}
				if (node.left !== null)
				{
					all(node.left);
				}
				if (node.right !== null)
				{
					all(node.right);
				}
			}
			all(this.root);
			console.log(heights);
			return heights;
		}
	}
}