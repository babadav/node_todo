console.log("script.js");

var BACKEND_URL = "http://localhost:5559/";

$(document).ready(function() {
    $.ajax({
	  url: BACKEND_URL + "item",
	}).done(function(data) {
		for (var i = 0; i < data.length; i++) {
			addListItem( data[i] )
		}
	});
});

function addListItem(item){
	var listItem = $('<li>');
	var ul = $('ul');


	listItem.html("Task: " + item.task + ", Completed: " + item.completed);
	listItem.append('<input type="checkbox"> ');
	listItem.append('<button class="delete">Delete</button>');
	listItem.attr('data-id', item.id);
	ul.append(listItem);

}



$('.add').on('click', function(e){
	e.preventDefault();
	console.log('submit button');

	$.ajax(BACKEND_URL + "item", {
		method: 'POST',
		data: {
			task: $('[name="task"]').val()
		}
	}).done(function(data){
		console.log(data);
		addListItem(data);
	})
})

$('body').on('click', '.delete', function(e){
	console.log(e, 'delete');

	// DELETE /item/1

	var $li = $(this).parents('li');

	var id = $li.attr('data-id');

	$.ajax(BACKEND_URL + "item/" + id, {
		method: 'DELETE'
	}).done(function(data){
		if (data.deleted) {
			$li.remove();
		}

	})
})








































