const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))


var idIncrementer = 0;

 class Item {
 	constructor(task){
		this.task = task;
		this.completed = false;
		this.id = idIncrementer++;
		this.deleted = false;
	}
}

let items = [];
items.push( new Item('Walk dog'));
items.push( new Item('Feed dog'));
items.push( new Item('Make Bed'));

// items[0].deleted = true;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});


app.get('/item', function(req, res){
	let notDeletedItems = items.filter(function(item){
		return (!item.deleted) 
	})
	res.json(notDeletedItems)

})

app.post('/item', function(req,res){

	let newItem = new Item(req.body.task) ;
	items.push(newItem);

	console.log("added new item, id: " + newItem.id);
	res.send( newItem );
})

app.get('/item/:itemId', function(req, res) {
	let itemId = req.params.itemId;

	let item = items.find(function(item){
		return (req.params.itemId == item.id )
	})
	res.json(item)
	
})

app.delete('/item/:itemId', function(req, res) {
	

	let doomedItem = items.find(function(item){
		return (req.params.itemId == item.id )
	})

	if(doomedItem){
		doomedItem.deleted = true;
	}


	res.json(doomedItem)
	
})


app.listen(5559, function () {
	console.log('Example app listening on port 5559!')
})