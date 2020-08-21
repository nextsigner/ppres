module.exports=function(app){

    const Presupuesto = require('./models/Presupuesto')
    var spawn = require('child_process').spawn;
    var spawnEMail = require('child_process').spawn;
    var cp
    var cpEMail

    function setAndSendEmail(v1){
        let d0=new Date(Date.now())
        let sd=''+d0.getDate()+'/'+parseInt(d0.getMonth()+1)+'/'+d0.getFullYear()+' '+d0.getHours()+':'+d0.getMinutes()+':'+d0.getSeconds()
        console.log("Creando presupuesto: "+sd);
        let d='<b>Nombre: </b>'+v1+'<br />'
//                +'<b>Fecha: </b>'+v4+'/'+v3+'/'+v2+'<br />'
//                +'<b>Hora: </b>'+v5+':'+v6+'hs <br />'
//                +'<b>GMT: </b>'+v7+'<br />'
//                +'<b>Latitud: </b>'+v8+'<br />'
//                +'<b>Longitud: </b>'+v9+'<br />'
//                +''
        cpEMail = spawnEMail('sh', ['sendEmail.sh', '"'+d+'"', "Nuevo presupuesto", 'qtpizarro@gmail.com']);
        cpEMail.on("exit", function(data) {
            console.log('Mail enviado: '+sd);
            console.log('Datos: '+d.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<br \/>/g, '\n'));
        });
        cpEMail.stderr.on("data", function(data) {
            console.error(data.toString());
        });
    }

    /*
                                     tecnico: String,
                                     cliente: String,
                                     contrato: String,
                                     productos: Object,
                                     fechaInstalacion: Date,
                                     fechaRegistro: Date
    */
    nuevoPresupuesto = function(req, res){
        console.log('Insertando nuevo presupuesto de usuario '+req.query.usuario)
        let d = new Date(Date.now())
        let presupuesto = new Presupuesto()
        presupuesto.tecnico = req.body.tecnico
        presupuesto.cliente = req.body.cliente
        presupuesto.contrato = req.body.contrato
        presupuesto.productos = req.body.productos
        presupuesto.fechaInstalacion = req.body.fechaInstalacion
        presupuesto.fechaRegistro = d

        console.log('Creando un nuevo presupuesto de técnico: '+presupuesto.tecnico+' Productos: \n'+presupuesto.productos)
        presupuesto.save(function(err, presRegistered){
            if(err){
                res.status(500).send(`Error al crear presupuesto: ${err}`)
                return
            }
            setAndSendEmail(presupuesto.cliente)
            res.status(200).send({presupuesto: presRegistered}) })
    };
    app.post('/ppres/nuevopresupuesto', nuevoPresupuesto);
}

