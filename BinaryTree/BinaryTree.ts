//left child node is always less than the current data, right is greater.  Cannot have duplicate data values.

namespace BinaryTree
{
	export interface INodeData
	{
		id: number;
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

		public find(id: number, strat: Function = null): Node
		{
			var result = null;
			var findId: Function = (node: Node, id: number): void =>
			{
				if (node.left !== null)
				{
					if (node.left.data.id === id)
					{
						result = node.left;
						if (strat !== null) strat(node, BinarySearchTree.NODE_LEFT);
						return;
					}
					findId(node.left, id);
				}
				if (node.right !== null)
				{
					if (node.right.data.id === id)
					{
						result = node.right;
						if (strat !== null) strat(node, BinarySearchTree.NODE_RIGHT);
						return;
					}
					findId(node.right, id);
				}
			}
			findId(this.root, id);
			return result;
		}

		public remove(id: number)
		{
			var removeLeftOrRightNode: Function = (x: Node, type) =>
			{
				if (type === BinarySearchTree.NODE_LEFT) x.left = null;
				if (type === BinarySearchTree.NODE_RIGHT) x.right = null;
			};
			var removedNode = this.find(id, removeLeftOrRightNode);
			this.length = this.toArray().length;
			return removedNode;
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