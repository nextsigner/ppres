module.exports=function(app){

    const Presupuesto = require('./models/Presupuesto')
    var spawn = require('child_process').spawn;
    var spawnEMail = require('child_process').spawn;
    var cp
    var cpEMail

    function setAndSendEmail(v1, v2, v3, v4, v5, v6){
        let d0=new Date(parseInt(v6))
        let sd=''+d0.getDate()+'/'+parseInt(d0.getMonth()+1)+'/'+d0.getFullYear()+' '+d0.getHours()+':'+d0.getMinutes()+':'+d0.getSeconds()
        let d1=new Date(parseInt(v5))
        let sd1=''+d1.getDate()+'/'+parseInt(d1.getMonth()+1)+'/'+d1.getFullYear()+' '+d1.getHours()+':'+d1.getMinutes()+':'+d1.getSeconds()
        console.log("Creando presupuesto: "+sd);
        /*
                                         tecnico: String,
                                         cliente: String,
                                         contrato: String,
                                         productos: Object,
                                         fechaInstalacion: Date,
                                         fechaRegistro: Date
        */
        let html1='<html><body>'
        let d='<b>Técnico: </b>'+v1+'<br />'
            +'<b>Cliente: </b>'+v2+'<br />'
            +'<b>Contrato: </b>'+v3+'<br />'
            +'<b>Productos: </b>'+v4+'<br />'
            +'<b>Fecha de Instalación: </b>'+sd+' <br />'
            +'<b>Fecha de Presupuesto: </b>'+sd1+' <br />'

        let html2='</body></html>'
        let df=html1+d+html2
        cpEMail = spawnEMail('sh', ['sendEmail.sh', '"'+df+'"', "Nuevo presupuesto", 'qtpizarro@gmail.com']);
        cpEMail.on("exit", function(data) {
            console.log('Mail enviado: '+sd);
            console.log('Datos: '+d.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<br \/>/g, '\n'));
        });
        cpEMail.stderr.on("data", function(data) {
            console.error(data.toString());
        });
    }
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
            setAndSendEmail(presupuesto.tecnico, presupuesto.cliente, presupuesto.contrato, presupuesto.productos, presupuesto.fechaInstalacion, d.getTime())
            res.status(200).send({presupuesto: presRegistered}) })
    };
    app.post('/ppres/nuevopresupuesto', nuevoPresupuesto);
}

