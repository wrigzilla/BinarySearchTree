window.onload = function () {
    var stuff = [
        { id: 1 },
        { id: 5 },
        { id: 2 },
        { id: 8 },
        { id: 7 },
        { id: 3 },
        { id: 5 },
        { id: 10 }
    ];
    var steve = BinaryTree.BinarySearchTree.fromArray(stuff);
    console.log(steve);
    console.log(steve.toString());
    //console.log(steve.find(10));
    //console.log(steve.remove(8));
    console.log(steve.length);
};
//left child node is always less than the current data, right is greater.  Cannot have duplicate data values.
var BinaryTree;
(function (BinaryTree) {
    var Node = (function () {
        function Node(data, left, right) {
            if (left === void 0) { left = null; }
            if (right === void 0) { right = null; }
            this.data = data;
            this.left = left;
            this.right = right;
        }
        return Node;
    }());
    BinaryTree.Node = Node;
    var BinarySearchTree = (function () {
        function BinarySearchTree(root) {
            if (root === void 0) { root = null; }
            this.root = root;
            //public members
            this.length = 0;
        }
        //static methods
        BinarySearchTree.fromArray = function (list) {
            var tree = new BinarySearchTree();
            list.forEach(function (x) { return tree.add(x); });
            return tree;
        };
        //public methods
        BinarySearchTree.prototype.add = function (data) {
            this.length++;
            if (this.root === null)
                return this.root = new Node(data);
            var currentNode = this.root;
            var parent = null;
            while (currentNode) {
                parent = currentNode;
                if (this.compareNodeToData(currentNode, data) === BinarySearchTree.NODE_LEFT) {
                    currentNode = currentNode.left;
                    if (currentNode === null)
                        return parent.left = new Node(data);
                }
                else if (this.compareNodeToData(currentNode, data) === BinarySearchTree.NODE_RIGHT) {
                    currentNode = currentNode.right;
                    if (currentNode === null)
                        return parent.right = new Node(data);
                }
            }
        };
        BinarySearchTree.prototype.find = function (id, strat) {
            if (strat === void 0) { strat = null; }
            var result = null;
            var findId = function (node, id) {
                if (node.left !== null) {
                    if (node.left.data.id === id) {
                        result = node.left;
                        if (strat !== null)
                            strat(node, BinarySearchTree.NODE_LEFT);
                        return;
                    }
                    findId(node.left, id);
                }
                if (node.right !== null) {
                    if (node.right.data.id === id) {
                        result = node.right;
                        if (strat !== null)
                            strat(node, BinarySearchTree.NODE_RIGHT);
                        return;
                    }
                    findId(node.right, id);
                }
            };
            findId(this.root, id);
            return result;
        };
        BinarySearchTree.prototype.remove = function (id) {
            var removeLeftOrRightNode = function (x, type) {
                if (type === BinarySearchTree.NODE_LEFT)
                    x.left = null;
                if (type === BinarySearchTree.NODE_RIGHT)
                    x.right = null;
            };
            var removedNode = this.find(id, removeLeftOrRightNode);
            this.length = this.toArray().length;
            return removedNode;
        };
        BinarySearchTree.prototype.balance = function () {
            //optimize tree for searching
        };
        BinarySearchTree.prototype.toArray = function () {
            var list = [];
            var addToArray = function (node) { list.push(node.data.id); };
            this.traverseAll(this.root, addToArray);
            return list;
        };
        BinarySearchTree.prototype.toString = function () {
            return this.toArray().join(",");
        };
        //private methods
        BinarySearchTree.prototype.compareNodeToData = function (node, data) {
            if (data.id <= node.data.id)
                return BinarySearchTree.NODE_LEFT;
            if (data.id > node.data.id)
                return BinarySearchTree.NODE_RIGHT;
        };
        BinarySearchTree.prototype.traverseAll = function (node, strategy) {
            strategy(node);
            if (node.left !== null) {
                this.traverseAll(node.left, strategy);
            }
            if (node.right !== null) {
                this.traverseAll(node.right, strategy);
            }
        };
        //static members
        BinarySearchTree.NODE_EMPTY = 0;
        BinarySearchTree.NODE_LEFT = 1;
        BinarySearchTree.NODE_RIGHT = 2;
        return BinarySearchTree;
    }());
    BinaryTree.BinarySearchTree = BinarySearchTree;
})(BinaryTree || (BinaryTree = {}));
