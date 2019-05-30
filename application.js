//Les chargements des modules
var express = require('express'),
bodyParser = require('body-parser'),
mongoose= require('mongoose'),
port = process.env.PORT || 5000,
app = express();
var fs = require('fs');


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//connection à driver de mongodb : mongoose 
mongoose.connect('mongodb://localhost/books1936');
//shema de mongoose car mongoose c un ODL et donc une structure prédéfini
var bookSchema = mongoose.Schema({
author: String,
bookTitle: String,
yearPub : Number
})

var Book = mongoose.model('Book',bookSchema);
//router c pour mentionner si get/put/post/del: Définir les router et le type d'interaction avec bd
var router = express.Router();
router.route('/')
.get(function(req, res){
//recherche des book dans la base book
	Book.find(function(err, books){
		if(err){
		res.send(err);
	}
	res.send(books);
	});





})

.post(function(req, res){
var book = new Book();
book.author = req.body.author;
book.bookTitle= req.body.bookTitle;
book.yearPub = req.body.yearPub;
book.save(function(err){
	if(err){
		res.send(err);
	}
	console.log(book);
	res.send({message: 'book has created!!'});
});
});



router.route('/:book_id')
.delete(function(req, res){
	Book.remove({_id: req.params.book_id}, function(err){
		if(err){
		res.send(err);
	}
	res.send({message: 'succes delete'});

	});
});



  
//Démarer le server

app.use('/api', router);

app.listen(port,function(){
	console.log('listening on port' + port);
})