import QtQuick 2.7
import QtQuick.Controls 2.0

ApplicationWindow{
    id: app
    visible: true
    visibility: "Maximized"
    property int fs : width*0.02
    property color c1: 'black'
    property color c2: 'white'
    property color c3: 'red'
    property color c4: 'gray'
    color: app.c1
    USettings{
        id: unikSettings
        url: 'ppres.cfg'
    }
    Item{
        id: xApp
        anchors.fill: parent
        ULogView{
            id: logView
            onVisibleChanged: {
                if(!visible){
                    Qt.quit()
                }
            }
        }
    }
    Shortcut{
        sequence: 'Esc'
        onActivated: Qt.quit()
    }
    Component.onCompleted: {
        logView.showLog('Iniciando...')
        let d=unik.getFile('t1').replace('Nave,\n', 'Nave, ')
        let m0=d.split('\n')
        let colNom1=''
        let colNom2=''
        let colNom3=''
        let colNom4=''
        let colNom5=''
        logView.showLog('Cantidad de lineas: '+m0.length)
        let script='var document;\n'
        for(var i=0;i<m0.length;i++){
            let linea=''+m0[i].replace(/ (/g, '(')
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
                if(linea.indexOf('ADICIONAL POR ELEMENTO')<0&&linea!==''){
                    let m2=linea.split(' $')
                    script+='document = {\n'
                            +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                            +'nombre : "'+m2[0]+'",\n'
                            +'tipovivienda : "'+colNom1+'",\n'
                            +'precio : "'+m2[1].replace(/ /g, '')+'"\n'
                            +'};\n'
                            +'db.productos.insert(document);\n\n'
                    script+='document = {\n'
                            +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                            +'nombre : "'+m2[0]+'",\n'
                            +'tipovivienda : "'+colNom2+'",\n'
                            +'precio : "'+m2[2].replace(/ /g, '')+'"\n'
                            +'};\n'
                            +'db.productos.insert(document);\n\n'
                    script+='document = {\n'
                            +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                            +'nombre : "'+m2[0]+'",\n'
                            +'tipovivienda : "'+colNom3+'",\n'
                            +'precio : "'+m2[3].replace(/ /g, '')+'"\n'
                            +'};\n'
                            +'db.productos.insert(document);\n\n'
                    script+='document = {\n'
                            +'categoria  : "TIPO 1) ALARMAS ESTÁNDAR (Honeywell VISTA 48) - ABONO MENSUAL",\n'
                            +'nombre : "'+m2[0]+'",\n'
                            +'tipovivienda : "'+colNom4+'",\n'
                            +'precio : "'+m2[4].replace(/ /g, '')+'"\n'
                            +'};\n'
                            +'db.productos.insert(document);\n\n'
                }
            }
        }
        logView.showLog('Script JavaScript para MongoDB: '+script)
        unik.setFile('t1.js', script)
    }
}
