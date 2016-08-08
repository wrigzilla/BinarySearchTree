window.onload = () => 
{
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