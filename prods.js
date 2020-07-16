module.exports=function(app){

    const Producto = require('./models/Productos')

    nuevoProducto = function(req, res){
        console.log('Insertando producto con nombre '+req.query.nombre)
        Producto.find({
                         //date: {$gt: h }
                         //date: {$gte: "2019-06-12T00:00:00+01:00", $lte: "2019-12-12T23:00:00+01:00" }
                         //date: {$gte: h, $lte: hf }
                         nombre:req.query.nombre // Search Filters
                     },
                     ['nombre'], // Columns to Return
                     {
                         skip:0, // Starting Row
                         limit:1, // Ending Row
                         sort:{
                             nombre: 1 //Sort by Date Added DESC
                         }
                     },
                     function(err, resultados){
                         if(err) res.status(500).send({mensaje: `Error al buscar mensajes: ${err}`})
                         if(resultados.length===0){
                             console.log('Registrando el dato del producto '+req.query.nombre);
                             //res.redirect('/res-add-producto.html?res=no'+mensajes.length)
                             //Registra el producto porque no existe ninguno con ese nombre
                             let producto = new Producto()
                             producto.nombre = req.query.nombre
                             producto.precio=req.query.precio
                             producto.fechaRegistro = new Date(Date.now())
                             console.log('Creando un nuevo producto nombre: '+producto.nombre+' precio: '+producto.precio)
                             producto.save(function(err, userRegistered){
                                 if(err){
                                     res.status(500).send(`Error when user register: ${err}`)
                                     return
                                 }
                                 res.redirect('/res-add-producto.html?res=El+producto+se+ha+agregado+correctamente&pid='+userRegistered._id)
                                 //res.status(200).send({producto: userRegistered})
                             })
                             return
                         }else{
                             console.log('Se intenta repetir el registro del producto '+req.query.nombre);
                             let msg='No+se+ha+registrado+el+productoYa+existe+un+producto+con+el+nombre+'+(''+req.query.nombre).replace(/ /g, '%20')
                             res.redirect('/res-add-producto.html?res='+msg)
                         }
                     })
    }
    setChatUser = function(req, res){
        let userId = req.query.userId
        let update = req.body
        Producto.findByIdAndUpdate(userId, update, function(err, userUpdated){
            if(err) res.status(500).send(`Error when user register: ${err}`)
            console.log('setChatUser: '+userUpdated)
            res.status(200).send({'user':userUpdated})
        })
    }

    getChatUser = function(req, res){
        console.log('Receiving get '+req.query.userId)
        let userid= req.query.userId
        Producto.findById(userid, function(err, user){
            if(err){
                res.status(500).send({user: `Error al buscar usuario: ${err}`})
                return
            }
            if(!user){
                res.status(200).send({'user': false})
                return
            }
            res.status(200).send({'user': user})
        })
    }

    app.get('/ppres/nuevoproducto', nuevoProducto);
    app.get('/chat/set/user', setChatUser);
    app.get('/chat/get/user', getChatUser);
}
