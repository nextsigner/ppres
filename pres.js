module.exports=function(app){

    const Presupuesto = require('./models/Presupuesto')
    var spawn = require('child_process').spawn;
    var spawnEMail = require('child_process').spawn;
    var cp
    var cpEMail

    function setAndSendEmail(devSending, vdev, v1, v2, v3, v4, v5, v6, v7){
        let d0=new Date(parseInt(v6))
        let sd=''+d0.getDate()+'/'+parseInt(d0.getMonth()+1)+'/'+d0.getFullYear()+' '+d0.getHours()+':'+d0.getMinutes()+':'+d0.getSeconds()
        //console.log('v5: '+v5)
        let d1=new Date(parseInt(v5.getTime()))
        let sd1=''+d1.getDate()+'/'+parseInt(d1.getMonth()+1)+'/'+d1.getFullYear()+' '+d1.getHours()+':'+d1.getMinutes()+':'+d1.getSeconds()
        console.log("Creando presupuesto: "+sd);
        let html1='<!DOCTYPE html><html><head><title>Presupuesto Prosegur</title></head><html><body>'
        let d=''
            +'<img src="https://github.com/pizarromario/pizarromario.github.io/blob/master/imgs/logo_cabecera.png?raw=true" style="width: 100%"/><br />'
            +'<b>Técnico: </b>'+v1+'<br />'
            +'<b>Cliente: </b>'+v2+'<br />'
            +'<b>Contrato: </b>'+v3+'<br /><br />'
        console.log('JSON PRODS: '+v4)
        let json=JSON.parse(v4)
        d+='<table border="2"><tr>'
                +'<td><b>Descripción</b></td>'
                +'<td><b>Código</b></td>'
                +'<td><b>Cantidad</b></td>'
                +'<td><b>Precio de Instalación</b></td>'
                +'<td><b>Precio de Abono</b></td>'
                +'<td><b>Adicional Riesgo</b></td>'
                +'<td><b>Total Parcial</b></td>'
                +'</tr>'
        for(var i=0;i<Object.keys(json).length;i++){
            d+='<tr>'
            d+='<td>'+json['item'+i].descripcion+'</td>'
            d+='<td style="text-align:center">'+json['item'+i].codigo+'</td>'
            d+='<td style="text-align:center">'+json['item'+i].cant+'</td>'
            d+='<td style="text-align:center">$'+json['item'+i].precioinstalacion+'</td>'
            d+='<td style="text-align:center">$'+json['item'+i].precioabono+'</td>'
            d+='<td style="text-align:center">$'+json['item'+i].adicionalriesgo+'</td>'
            d+='<td style="text-align:center">$'+json['item'+i].totalItem+'</td>'
            d+='</tr>'
        }
        d+='<tr>'
                +'<td colspan=6></td>'
                +'<td><b>Total</b></td>'
                +'</tr>'
        d+='<tr>'
                +'<td colspan=6></td>'
                +'<td>$11111</td>'
                +'</tr>'
        d+='</table>'
        d+='<br />'
        d+='<b>Fecha de Instalación: </b>'+sd+' <br />'
        //            +'<b>Cliente: </b>'+v2+'<br />'
        //            +'<b>Contrato: </b>'+v3+'<br />'
        //            +'<b>Productos: </b>'+v4+'<br />'
        //            +'<b>Fecha de Instalación: </b>'+sd+' <br />'
        //            +'<b>Fecha de Presupuesto: </b>'+sd1+' <br />'
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
<texto nombre="normal4">En caso que no pueda recibirnos en la fecha y horario acordado, le solicitamos que se comunique a nuestro Contact Center para reprogramar la visita: 011 4709-8080 / 0800-888-8188.</texto>
<texto nombre="normal5">Aprovechamos la ocasión para saludarlo cordialmente.</texto>
<texto nombre="normal6">Estamos comprometidos con su seguridad. Para conocer nuestras medidas de prevención por el COVID-19 haga click </texto>
<texto nombre="normal7">AQUÍ</texto>
<link nombre="link_normal7">https://www.prosegur.com.ar/dam/jcr:a6b5d19c-0534-4562-9b03-242fb162a9b5/video-tecnico-Covid--ultima-versi-n.mp4</link>
<link nombre="link_prosegur">http://www.prosegur.com.ar/</link>
<link nombre="link_portal">https://www.prosegur.com.ar/portal-clientes</link>
<link nombre="link_facebook">https://www.facebook.com/ProsegurArgentina/</link>
<link nombre="link_twitter">https://twitter.com/ProsegurAR</link>
<link nombre="link_prosegur2">http://www.prosegur.com.ar/</link>
<link nombre="link_youtube">https://www.youtube.com/user/ProseguralarmasArg</link>
<imagenEnDisco>
<archivo>arrow_header.png</archivo>
<tipo>png</tipo>
<nombreHTML>arrow_header</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>arrow_down.png</archivo>
<tipo>png</tipo>
<nombreHTML>arrow_down</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>pliegue.jpg</archivo>
<tipo>jpeg</tipo>
<nombreHTML>pliegue</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>arrow_left.png</archivo>
<tipo>png</tipo>
<nombreHTML>arrow_left</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>logo_prosegur.jpg</archivo>
<tipo>jpeg</tipo>
<nombreHTML>logo_prosegur</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>mailing-referentes-body.jpg</archivo>
<tipo>jpeg</tipo>
<nombreHTML>mailing-referentes-body</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>facebook.png</archivo>
<tipo>png</tipo>
<nombreHTML>facebook</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>twitter.png</archivo>
<tipo>png</tipo>
<nombreHTML>twitter</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>youtube.png</archivo>
<tipo>png</tipo>
<nombreHTML>youtube</nombreHTML>
</imagenEnDisco>
<imagenEnDisco>
<archivo>link-prosegur.png</archivo>
<tipo>png</tipo>
<nombreHTML>link_prosegur</nombreHTML>
</imagenEnDisco>
<plantillaXSLT>mailing_VisitaTecnica_v2.xslt</plantillaXSLT>
</correo2>
<refID>AR1-44PJFVC</refID>
        */
        let asunto=''
        let from='Ppres - '+v1
        let vdevSending=''+devSending
        console.log('DS:'+vdevSending+' vdev:'+vdev+' email cliente: '+v7)
        if(vdevSending==='true'){
            asunto='Prueba '+vdev
            from='Programador Prueba '+vdev
        }else{
            asunto='Nuevo Presupuesto'
        }
        let html2='</html></body></html>'
        let df=html1+d+html2
        cpEMail = spawnEMail('sh', ['sendEmail.sh', ''+df+'', ""+asunto+"", 'pizarromario@gmail.com', from, "<"+v7+">"]);
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
            setAndSendEmail(req.body.devSending, req.body.vdev, presupuesto.tecnico, presupuesto.cliente, presupuesto.contrato, presupuesto.productos, presupuesto.fechaInstalacion, d.getTime(), req.body.email)
            res.status(200).send({presupuesto: presRegistered}) })
    };
    app.post('/ppres/nuevopresupuesto', nuevoPresupuesto);
}

