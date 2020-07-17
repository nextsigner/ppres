function setT1() {
    let d=unik.getFile('t1.txt').replace('Nave,\n', 'Nave, ')
    let m0=d.split('\n')
    let colNom1=''
    let colNom2=''
    let colNom3=''
    let colNom4=''
    let colNom5=''

    let numape=0

    let ape1C1=''
    let ape1C2=''
    let ape1C3=''
    let ape1C4=''

    let ape2C1=''
    let ape2C2=''
    let ape2C3=''
    let ape2C4=''

    logView.showLog('Cantidad de lineas: '+m0.length)
    let script='var document;\n'
    let linea
    for(var i=0;i<m0.length;i++){
        linea=''+m0[i]
        if(linea.indexOf('ADICIONAL POR ELEMENTO')>=0){
            logView.showLog('AAA--->'+linea)
            if(numape===0){
                let m2=linea.split(' $')
                ape1C1=m2[1]
                ape1C2=m2[2]
                ape1C3=m2[3]
                ape1C4=m2[4]
            }
            if(numape===1){
                let m2=linea.split(' $')
                ape2C1=m2[1]
                ape2C2=m2[2]
                ape2C3=m2[3]
                ape2C4=m2[4]
            }
            numape++
        }
    }
    numape=0
    for(i=0;i<m0.length;i++){
        linea=''+m0[i].replace(/ (/g, '(')
        logView.showLog('--->'+linea)
        if(i===0){
            let m1=linea.replace('TIPO VIVIENDA ', '').split(' ')
            //let m1=linea.split(' ')
            colNom1=m1[0]
            colNom2=m1[1]
            colNom3=m1[2]
            colNom4=m1[3]
            colNom5=m1[4]
            logView.showLog('Cols: '+colNom1+' '+colNom2+' '+colNom3+' '+colNom4+' '+colNom5+' ')
        }else{
            let dc1=''
            let dc2=''
            let dc3=''
            let dc4=''
            if(numape===0){
                dc1=ape1C1
                dc2=ape1C2
                dc3=ape1C3
                dc4=ape1C4
            }else{
                dc1=ape2C1
                dc2=ape2C2
                dc3=ape2C3
                dc4=ape2C4
            }
            if(linea.indexOf('ADICIONAL POR ELEMENTO')>=0){
                numape++
            }

            if(linea.indexOf('ADICIONAL POR ELEMENTO')<0&&linea!==''){
                let m2=linea.split(' $')
                script+='document = {\n'
                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom1+'",\n'
                        +'precio : "'+m2[1].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc1.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom2+'",\n'
                        +'precio : "'+m2[2].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc2.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom3+'",\n'
                        +'precio : "'+m2[3].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc3.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom4+'",\n'
                        +'precio : "'+m2[4].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc4.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
            }
        }
    }
    //logView.showLog('Script JavaScript para MongoDB: '+script)
    return script
    //unik.setFile('t1.js', script)
}

function setT2() {
    let cat='TIPO 2) ALARMAS SMART o VIDEOVERIFICACION (RSI) - ABONO MENSUAL'
    let d=unik.getFile('t2.txt').replace('Nave,\n', 'Nave, ')
    let m0=d.split('\n')
    let colNom1=''
    let colNom2=''
    let colNom3=''
    let colNom4=''
    let colNom5=''

    let ape1C1=''
    let ape1C2=''
    let ape1C3=''
    let ape1C4=''

    logView.showLog('Cantidad de lineas: '+m0.length)
    let script='var document;\n'
    let linea
    for(var i=0;i<m0.length;i++){
        linea=''+m0[i]
        if(linea.indexOf('ADICIONAL POR ELEMENTO')>=0){
            logView.showLog('APE: '+linea)
            let m2=linea.split(' $')
            ape1C1=m2[1]
            ape1C2=m2[2]
            ape1C3=m2[3]
            ape1C4=m2[4]
        }
    }
    for(var i=0;i<m0.length;i++){
        linea=''+m0[i].replace(/ (/g, '(')
        logView.showLog('--->'+linea)
        if(i===0){
            let m1=linea.replace('TIPO VIVIENDA ', '').split(' ')
            //let m1=linea.split(' ')
            colNom1=m1[0]
            colNom2=m1[1]
            colNom3=m1[2]
            colNom4=m1[3]
            colNom5=m1[4]
            logView.showLog('Cols: '+colNom1+' '+colNom2+' '+colNom3+' '+colNom4)
        }else{
            let dc1=''
            let dc2=''
            let dc3=''
            let dc4=''
            dc1=ape1C1
            dc2=ape1C2
            dc3=ape1C3
            dc4=ape1C4
            // /*
            if(linea.indexOf('ADICIONAL POR ELEMENTO')<0&&linea!==''&&linea.indexOf('Pack INICIAL (SSSA)')<0){
                let m2=linea.split(' $')
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom1+'",\n'
                        +'precio : "'+m2[1].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc1.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom2+'",\n'
                        +'precio : "'+m2[2].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc2.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom3+'",\n'
                        +'precio : "'+m2[3].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc3.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom4+'",\n'
                        +'precio : "'+m2[4].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc4.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
            }
            //*/
        }
    }
    //logView.showLog('Script JavaScript para MongoDB: '+script)
    return script
    //unik.setFile('t2.js', script)
}

function setT3() {
    let cat='TIPO 3) ALARMAS HIBRIDAS SMART + 3 CANALES (Tyco) - ABONO MENSUAL'

    let d=unik.getFile('t3.txt').replace('Nave,\n', 'Nave, ')
    let m0=d.split('\n')
    let colNom1=''
    let colNom2=''
    let colNom3=''
    let colNom4=''
    let colNom5=''

    let numape=0

    let ape1C1=''
    let ape1C2=''
    let ape1C3=''
    let ape1C4=''

    let ape2C1=''
    let ape2C2=''
    let ape2C3=''
    let ape2C4=''

    logView.showLog('Cantidad de lineas: '+m0.length)
    let script='var document;\n'
    let linea
    for(var i=0;i<m0.length;i++){
        linea=''+m0[i]
        if(linea.indexOf('ADICIONAL POR ELEMENTO')>=0){
            logView.showLog('AAA--->'+linea)
            if(numape===0){
                let m2=linea.split(' $')
                ape1C1=m2[1]
                ape1C2=m2[2]
                ape1C3=m2[3]
                ape1C4=m2[4]
            }
            if(numape===1){
                let m2=linea.split(' $')
                ape2C1=m2[1]
                ape2C2=m2[2]
                ape2C3=m2[3]
                ape2C4=m2[4]
            }
            numape++
        }
    }
    numape=0
    for(i=0;i<m0.length;i++){
        linea=''+m0[i].replace(/ (/g, '(')
        logView.showLog('--->'+linea)
        if(i===0){
            let m1=linea.replace('TIPO VIVIENDA ', '').split(' ')
            //let m1=linea.split(' ')
            colNom1=m1[0]
            colNom2=m1[1]
            colNom3=m1[2]
            colNom4=m1[3]
            colNom5=m1[4]
            logView.showLog('Cols: '+colNom1+' '+colNom2+' '+colNom3+' '+colNom4+' '+colNom5+' ')
        }else{
            let dc1=''
            let dc2=''
            let dc3=''
            let dc4=''
            if(numape===0){
                dc1=ape1C1
                dc2=ape1C2
                dc3=ape1C3
                dc4=ape1C4
            }else{
                dc1=ape2C1
                dc2=ape2C2
                dc3=ape2C3
                dc4=ape2C4
            }
            if(linea.indexOf('ADICIONAL POR ELEMENTO')>=0){
                numape++
            }

            if(linea.indexOf('ADICIONAL POR ELEMENTO')<0&&linea!==''&&linea.indexOf('Pack INICIAL (SSSA)')<0&&linea.indexOf('Alto Riesgo Pack INICIAL (AR SSSA)')<0){
                let m2=linea.split(' $')
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom1+'",\n'
                        +'precio : "'+m2[1].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc1.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom2+'",\n'
                        +'precio : "'+m2[2].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc2.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom3+'",\n'
                        +'precio : "'+m2[3].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc3.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
                script+='document = {\n'
                        +'categoria  : "'+cat+'",\n'
                        +'nombre : "'+m2[0]+'",\n'
                        +'tipovivienda : "'+colNom4+'",\n'
                        +'precio : "'+m2[4].replace(/ /g, '')+'",\n'
                        +'adicionalporelemento : "'+dc4.replace(/ /g, '')+'"\n'
                        +'};\n'
                        +'db.productos.insert(document);\n\n'
            }
        }
    }
    //logView.showLog('Script JavaScript para MongoDB: '+script)
    return script
    //unik.setFile('t3.js', script)
}
