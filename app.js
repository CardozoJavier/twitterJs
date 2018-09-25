const express= require ('express');
const app= express();
const nunjucks= require ('nunjucks');
const morgan= require ('morgan');
const routes= require ('./routes/index.js')
const bodyParser= require ('body-parser');

// Apuntamos nunjucks al directorio correcto para los templates.
nunjucks.configure('./views', {
	noCache: true,
	autoescape: true,
	express: app
});
// Hace que 'res.render' funcione con archivos html.
app.set('view engine', 'html');
// Usamos nunjucks cuando 'res.render' reciba archivos html.
app.engine('html', nunjucks.render);

app.use (bodyParser.urlencoded ({extended : false}));
app.use (bodyParser.json());
app.use (express.static ('./public'))
app.use (morgan('tiny'));
app.use ('/', routes);

app.listen(3000, function(){
	console.log('Servidor iniciado en puerto 3000.')
});