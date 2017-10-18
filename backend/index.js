const express = require('express')
const app = express()

let items = [
	{
		task:      	"Feed dog",
		completed: 	false,
		id: 		"0"


	},
	{
		task: 	   	"Make bed",
		completed: 	false,
		id: 		"1"
		
	},
	{
		task: 	   	"Walk dog",
		completed: 	false,
		id: 		"2"
		
	},
]


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/item', function(req, res){
	res.json(items)
})

app.get('/', function(req, res) {
	res.send('Hello World!')
})

app.get('/shelly', function(req, res) {
	res.send('Shelly is cool.')
})


app.get('/item/:itemId', function(req, res) {
	let itemId = req.params.itemId;

	let item = items.filter(function(item){
		return (req.params.itemId == item.id )
	})
	res.json(item)
	
})



app.listen(5559, function () {
	console.log('Example app listening on port 5559!')
})