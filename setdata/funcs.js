function setCSV(archivo) {
    //Columnas ;Descripción;Código;$ Instalacion;$ Abono;$ A. Riesgo;Observaciones
    console.log('Procesando archivo '+archivo)
    if(!unik.fileExist(archivo)){
        console.log('El archivo no existe!')
        return
    }
    let d=unik.getFile(archivo)//.replace('Nave,\n', 'Nave, ')
    let m0=d.split('\n')
    let colNom1=''
    let colNom2=''
    let colNom3=''
    let colNom4=''
    let colNom5=''
    let colNom6=''
    let colNom7=''


    logView.showLog('Cantidad de lineas: '+m0.length)
    let script='var document;\n'
    let linea
    var i
    for(i=0;i<m0.length;i++){
        linea=''+m0[i]//.replace(/ (/g, '(')
        let m2=linea.split(';')

        script+='document = {\n'
                +'descripcion  : "'+(''+m2[1]).replace(/"/g,'')+'",\n'
                +'codigo : "'+(''+m2[2]).replace(/"/g,'')+'",\n'
                +'precioinstalacion : "'+(''+m2[3]).replace(/"/g,'')+'",\n'
                +'precioabono : "'+(''+m2[4]).replace(/"/g,'')+'",\n'
                +'adicionalriesgo : "'+(''+m2[5]).replace(/"/g,'')+'",\n'
                +'observaciones : "'+(''+m2[6]).replace(/"/g,'')+'"\n'
                +'};\n'
                +'db.productos.insert(document);\n\n'

        //logView.showLog('--->'+linea)
        //script+=linea+'\n'
//        if(i===0){
//            let m1=linea.replace('TIPO VIVIENDA ', '').split(' ')
//            //let m1=linea.split(' ')
//            colNom1=m1[0]
//            colNom2=m1[1]
//            colNom3=m1[2]
//            colNom4=m1[3]
//            colNom5=m1[4]
//            logView.showLog('Cols: '+colNom1+' '+colNom2+' '+colNom3+' '+colNom4+' '+colNom5+' ')
//        }else{
//            let dc1=''
//            let dc2=''
//            let dc3=''
//            let dc4=''
//            if(numape===0){
//                dc1=ape1C1
//                dc2=ape1C2
//                dc3=ape1C3
//                dc4=ape1C4
//            }else{
//                dc1=ape2C1
//                dc2=ape2C2
//                dc3=ape2C3
//                dc4=ape2C4
//            }
//            if(linea.indexOf('ADICIONAL POR ELEMENTO')>=0){
//                numape++
//            }

//            if(linea.indexOf('ADICIONAL POR ELEMENTO')<0&&linea!==''){
//                let m2=linea.split(' $')
//                script+='document = {\n'
//                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
//                        +'nombre : "'+m2[0]+'",\n'
//                        +'tipovivienda : "'+colNom1+'",\n'
//                        +'precio : "'+m2[1].replace(/ /g, '')+'",\n'
//                        +'adicionalporelemento : "'+dc1.replace(/ /g, '')+'"\n'
//                        +'};\n'
//                        +'db.productos.insert(document);\n\n'
//                script+='document = {\n'
//                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
//                        +'nombre : "'+m2[0]+'",\n'
//                        +'tipovivienda : "'+colNom2+'",\n'
//                        +'precio : "'+m2[2].replace(/ /g, '')+'",\n'
//                        +'adicionalporelemento : "'+dc2.replace(/ /g, '')+'"\n'
//                        +'};\n'
//                        +'db.productos.insert(document);\n\n'
//                script+='document = {\n'
//                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
//                        +'nombre : "'+m2[0]+'",\n'
//                        +'tipovivienda : "'+colNom3+'",\n'
//                        +'precio : "'+m2[3].replace(/ /g, '')+'",\n'
//                        +'adicionalporelemento : "'+dc3.replace(/ /g, '')+'"\n'
//                        +'};\n'
//                        +'db.productos.insert(document);\n\n'
//                script+='document = {\n'
//                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
//                        +'nombre : "'+m2[0]+'",\n'
//                        +'tipovivienda : "'+colNom4+'",\n'
//                        +'precio : "'+m2[4].replace(/ /g, '')+'",\n'
//                        +'adicionalporelemento : "'+dc4.replace(/ /g, '')+'"\n'
//                        +'};\n'
//                        +'db.productos.insert(document);\n\n'
//            }
//        }
    }
    //logView.showLog('Script JavaScript para MongoDB: '+script)
    return script
    //unik.setFile('t1.js', script)
}
