//importa librerias
var express = require("express");
var nunjucks = require("nunjucks");
//Creando un servidor web
var app = express();

//Configuración de express
//Primer argumento es un nombre lógico
//Segundo argumento es un nombre real
app.use("/css", express.static(__dirname+"/css"));//directory permite ver el contenido de las carpetas
app.use("/imagenes", express.static(__dirname+"/imagenes"));//static permite acceso pero debo cnocer la ruta completa del archivo
app.use("/videos", express.static(__dirname+"/videos"));
app.use("/javascript", express.static(__dirname+"/javascript"));

//Habilita resivir parámetros post
app.use(express.urlencoded());

nunjucks.configure(__dirname+"/vistas", {
	express:app
});

//Levanta el servidor en el puerto 8000
app.listen(8000);

app.get("/", function(request, response){
	response.render("index.html");
});

app.get("/contacto", function(request, response){
	response.render("contacto.html");	
});

/*La siguientes lineas dirian algo como cuando alguien solicite la dirección /blog*/
app.get("/blog", function(request, response){
	
	var postEncontrados = [{
		titulo:"post 1",
		descripcion:"Descripción del post1"
	},{
		titulo:"post 2",
		descripcion:"Descripción del post2"
	}];
	
	/*En la línea siguiente simulamos que la base no tiene artículos*/
	//postEncontrados = [];
	
	response.render("blog.html",{
		posts:postEncontrados
	});
});

app.post("/suscribir", function(request, response){
	//request tiene todo lo que envía el usuario y el response es todo lo que le pintamos al usuario
	//body tiene todos los parametros del forulario que se envian por un http-post
	console.log("email del usuario" + request.body.email);
	
	response.send("email del usuario" + request.body.email);
});

app.post("/contactar", function(request, response){
	//request tiene todo lo que envía el usuario y el response es todo lo que le pintamos al usuario
	//body tiene todos los parametros del forulario que se envian por un http-post
	//console.log("email del usuario" + request.body.email);
	
	response.send("nombre" + request.body.nombre)+("email del usuario" + request.body.email)+("Web site" + request.body.url);
});

console.log("arrancando servidor");
