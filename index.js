var args = process.argv.slice(2);
var puertoApp = '8080'; //Puerto que recibe acciones
var puertoStatico = '8081'; //Puerto para descargar archivos
var folderFiles = 'files/';
var serverEmail=process.env.EMAIL
var serverEmailPass=process.env.EMAILPASS
var serverEmailService=process.env.EMAILSERVICE

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(puertoStatico);

var fs = require('fs');
var path = require('path');

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('port', process.env.PORT || puertoApp);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./ppres')(app);

app.listen(app.get('port'), function() {
    console.log('Servidor logiteca iniciado.');
    console.log('Puertos: App=' + app.get('port') + '  Files='+ puertoStatico);
});
