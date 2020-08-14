import QtQuick 2.7
import QtQuick.Controls 2.0
import "funcs.js" as JS

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
        //Atención!!!! este es el código para convertir de ISO-8859-1 a UTF-8
        //iconv -f ISO-8859-1 -t UTF-8//TRANSLIT productos_14_08_20_utf8.csv -o productos_14_08_20_utf8_2.csv

        logView.showLog('Iniciando...')
        let t1=JS.setCSV('productos_14_08_20.csv')
        let tf=t1+'\n'
        unik.setFile('fullScript.js', tf)
        logView.showLog(tf)
    }
}
