const express= require ('express');
const router= express.Router();
const tweetBank= require ('../tweetBank');
const img= '/img/1234.jpeg';

// Agregamos nuevos tweets al index por medio del form.
router.post ('/tweets', function (req,res){
	var name= req.body.name;
	var content= req.body.text;
	tweetBank.add (name,content);
	res.redirect ('/');
})
// Mostramos un tweet especifico a traves de su 'id'.
router.get ('/tweets/:id', function (req,res){
	var id= Number(req.params.id);
	var tweet= tweetBank.find ({id : id});
	res.render('index', {tweets : tweet, img : img})
})
// Mostramos todos los tweets de un user especifico.
router.get ('/users/:name', function (req,res){
	var name= req.params.name;
	var list= tweetBank.find ({name : name});
	res.render ('index', {img : img, tweets : list, name : name});
})
// Mostramos el index.
router.get ('/', function (req,res){
	let tweets= tweetBank.list();
	res.render ('index', {img : img, tweets : tweets, showForm : true});
})

module.exports= router;