console.log("script.js");

$(document).ready(function() {
    $.ajax({
	  url: "http://localhost:5559/item",
	}).done(makeNewList);
});

function makeNewList(data) {

	console.log(data);

	function addListItem(){
		var listItem = $('<li>');
		var ul = $('ul');

		listItem.html("Task: " + data[i].task + ", Completed: " + data[i].completed);
		ul.append(listItem);

	}

	for (var i = 0; i < data.length; i++) {
		addListItem();
	}
};

$('button').on('click', function(e){
	e.preventDefault();
	console.log('submit button');
})