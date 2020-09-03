module.exports=function(app){

    const Presupuesto = require('./models/Presupuesto')
    var spawn = require('child_process').spawn;
    var spawnEMail = require('child_process').spawn;
    var cp
    var cpEMail

    function setAndSendEmail(devSending, vdev, v1, v2, v3, v4, v5){
        //setAndSendEmail(req.body.devSending, req.body.vdev, presupuesto.tecnico, req.body.cliente, presupuesto.productos, presupuesto.fechaInstalacion, d.getTime())
        let d0=new Date(parseInt(v5))
        let sd=''+d0.getDate()+'/'+parseInt(d0.getMonth()+1)+'/'+d0.getFullYear()+' '+d0.getHours()+':'+d0.getMinutes()+':'+d0.getSeconds()
        //console.log('v5: '+v5)
        let d1=new Date(parseInt(v4.getTime()))
        let sd1=''+d1.getDate()+'/'+parseInt(d1.getMonth()+1)+'/'+d1.getFullYear()+' '+d1.getHours()+':'+d1.getMinutes()+':'+d1.getSeconds()
        console.log("Creando presupuesto: "+sd);
        let html1='<!DOCTYPE html><html><head><title>Presupuesto Prosegur</title></head><html><body>'
        console.log("JSON TEC: "+v1+"\n\n\n")
        console.log("JSON CLI: "+v2+"\n\n\n")
        let jsonTec=JSON.parse(v1)
        let jsonCli=JSON.parse(v2)
        let d=''
            +'<img src="https://github.com/pizarromario/pizarromario.github.io/blob/master/imgs/logo_cabecera.png?raw=true" style="width: 100%"/><br />'

            +'<h2>Técnico</h2>'
            +'<b>Nombre: </b>'+jsonTec.tecnico.nombre+'<br />'
            +'<b>Teléfono: </b>'+jsonTec.tecnico.telefono+'<br />'
            +'<b>E-Mail: </b>'+jsonTec.tecnico.email+'<br />'

            +'<h2>Cliente</h2>'
            +'<b>Nombre y Apellido: </b>'+jsonCli.cliente.nombre+'<br />'
            +'<b>Dirección: </b>'+jsonCli.cliente.direccion+'<br />'
            +'<b>Teléfono: </b>'+jsonCli.cliente.telefono+'<br />'
            +'<b>E-Mail: </b>'+jsonCli.cliente.email+'<br />'
            +'<b>Contrato: </b>'+jsonCli.cliente.contrato+'<br />'

        console.log('JSON PRODS: '+v3+"\n\n\n\n")
        let json=JSON.parse(v3)
        d+='<h2>Productos/Servicios</h2>'
        d+='<table border="2"><tr>'
                +'<td><b>Descripción</b></td>'
                +'<td><b>Código</b></td>'
                +'<td><b>Cantidad</b></td>'
                +'<td><b>Precio de Instalación</b></td>'
                +'<td><b>Precio de Abono</b></td>'
                +'<td><b>Adicional Riesgo</b></td>'
                +'<td><b>Total Parcial</b></td>'
                +'</tr>'
        for(var i=0;i<Object.keys(json).length-1;i++){
            d+='<tr>'
            d+='<td>'+json['item'+i].descripcion+'</td>'
            d+='<td style="text-align:center">'+json['item'+i].codigo+'</td>'
            d+='<td style="text-align:center">'+json['item'+i].cant+'</td>'
            d+='<td style="text-align:center">$'+parseFloat(json['item'+i].precioinstalacion).toFixed(2)+'</td>'
            d+='<td style="text-align:center">$'+parseFloat(json['item'+i].precioabono).toFixed(2)+'</td>'
            d+='<td style="text-align:center">$'+parseFloat(json['item'+i].adicionalriesgo).toFixed(2)+'</td>'
            d+='<td style="text-align:center">$'+parseFloat(json['item'+i].precioinstalacion * json['item'+i].cant).toFixed(2)+'</td>'
            d+='</tr>'
        }
        d+='<tr>'
                +'<td colspan=6></td>'
                +'<td style="text-align:center"><b>Total</b></td>'
                +'</tr>'
        d+='<tr>'
                +'<td colspan=5></td>'
                +'<td style="text-align:center">Total Sin IVA</td>'
                +'<td style="text-align:center">$'+json['valores'].totalSinIVA+'</td>'
                +'</tr>'
        d+='<tr>'
                +'<td colspan=5></td>'
                +'<td>Total Con IVA</td>'
                +'<td>$'+json['valores'].totalConIVA+'</td>'
                +'</tr>'
        d+='<tr>'
                +'<td colspan=5></td>'
                +'<td>Descuento</td>'
                +'<td>%'+json['valores'].descuento+'</td>'
                +'</tr>'
        d+='<tr>'
                +'<td colspan=5></td>'
                +'<td>Total</td>'
                +'<td>$'+json['valores'].totalConDescuento+'</td>'
                +'</tr>'
        d+='</table>'
        d+='<br />'
        d+='<b>Fecha de Presupuesto: </b>'+sd+' <br />'
        d+='<b>Fecha de Instalación: </b>'+sd1+' <br />'

        d+='<p>En caso que no pueda recibirnos en la fecha y horario acordado, le solicitamos que se comunique a nuestro Contact Center para reprogramar la visita: 011 4709-8080 / 0800-888-8188.</p>'
d+='<p nombre="normal5">Aprovechamos la ocasión para saludarlo cordialmente.</p>'
d+='<p nombre="normal6">Estamos comprometidos con su seguridad. Para conocer nuestras medidas de prevención por el COVID-19 haga click '
d+='<a href="https://www.prosegur.com.ar/dam/jcr:a6b5d19c-0534-4562-9b03-242fb162a9b5/video-tecnico-Covid--ultima-versi-n.mp4">AQUÍ</a></p>'
d+='<a href="http://www.prosegur.com.ar/">Ir a Prosegur</a><br />'
d+='<a href="https://www.prosegur.com.ar/portal-clientes">Ir a Portal de Clientes</a><br />'
d+='<a href="https://www.facebook.com/ProsegurArgentina/">Ir al Facebook de Prosegur Argentina</a><br />'
d+='<a href="https://twitter.com/ProsegurAR">Ir al Twitter de Prosegur Argentina</a><br />'
d+='<a href="https://www.youtube.com/user/ProseguralarmasArg">Ir al Canal de YouTube de Prosegur Argentina</a><br />'
        /*
<from>Visita.Tecnica-Argentina@prosegur.com</from>
<nombreFrom>Prosegur Alarmas</nombreFrom>
<to>SANTI.MARESCA@HOTMAIL.COM</to>
<subject>Visita Técnica Prosegur</subject>
<cc></cc>
<correo2>
<!-- Seccion que cambia con cada envio -->
<imagenToa>
<uriTOA>/resources/AR00122992/XR_FOTO_TECNICO</uriTOA>
<nombreHTML>foto_tecnico</nombreHTML>
<altFile fileType="jpeg">logo_prosegur.jpg</altFile>
</imagenToa>
<texto nombre="saludo">Estimado/a MAS TECHNOLOGY SRL </texto>
<texto nombre="cliente">Cliente 1843700 / INT526166.2</texto>
<texto nombre="texto1">AVENIDA CABILDO, 2120 – (1426-CAPITAL FEDERAL)</texto>
<texto nombre="texto2">09:00 - 10:00 Hs</texto>
<texto nombre="texto3">AR1-44PJFVC</texto>
<texto nombre="texto4">HEREDIA, GONZALO  ALBERTO</texto>
<texto nombre="texto5">38403033</texto>
<texto nombre="texto6">AR00122992</texto>
<!-- Fin Seccion que cambia con cada envio -->
<texto nombre="head1">Saber quién hará su visita técnica,</texto>
<texto nombre="head2">también es cuidar su seguridad.</texto>
<texto nombre="normal1">Le recordamos que </texto>
<texto nombre="bold1">el día de hoy, Usted tiene una visita técnica acordada.</texto>
<texto nombre="normal2">A continuación encontrará toda la información necesaria: </texto>
<texto nombre="label1">Domicilio: </texto>
<texto nombre="label2">Franja horaria estimada de llegada del técnico: </texto>
<texto nombre="label3">Número de pedido: </texto>
<texto nombre="normal3">Para su seguridad, le adjuntamos la foto del técnico que concurrirá a su domicilio y sus datos personales:</texto>
<texto nombre="label4">Nombre: </texto>
<texto nombre="label5">DNI: </texto>
<texto nombre="label6">Legajo Nº: </texto>
*/
        let asunto=''
        let from='Ppres - '+v1
        let vdevSending=''+devSending
        //console.log('DS:'+vdevSending+' vdev:'+vdev+' email cliente: '+jsonCli.cliente.email)
        if(vdevSending==='true'){
            asunto='Prueba '+vdev
            from='Programador Prueba '+vdev
        }else{
            asunto='Nuevo Presupuesto'
        }
        let html2='</html></body></html>'
        let df=html1+d+html2
        cpEMail = spawnEMail('sh', ['sendEmail.sh', ''+df+'', ""+asunto+"", 'pizarromario@gmail.com', from, "<"+jsonCli.cliente.email+">"]);
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
        presupuesto.productos = req.body.productos
        presupuesto.fechaInstalacion = req.body.fechaInstalacion
        presupuesto.fechaRegistro = d

        //console.log('Creando un nuevo presupuesto de técnico: '+presupuesto.tecnico+' Productos: \n'+presupuesto.productos)
        presupuesto.save(function(err, presRegistered){
            if(err){
                res.status(500).send(`Error al crear presupuesto: ${err}`)
                return
            }
            setAndSendEmail(req.body.devSending, req.body.vdev, presupuesto.tecnico, req.body.cliente, presupuesto.productos, presupuesto.fechaInstalacion, d.getTime())
            res.status(200).send({presupuesto: presRegistered}) })
    };
    app.post('/ppres/nuevopresupuesto', nuevoPresupuesto);
}

