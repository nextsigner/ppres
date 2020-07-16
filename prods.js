module.exports=function(app){

    const Producto = require('./models/Productos')

    nuevoProducto = function(req, res){
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
            res.status(200).send({producto: userRegistered})
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
