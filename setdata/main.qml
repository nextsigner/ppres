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
        //TODO Obtener los datos de t3 Pymes
        logView.showLog('Iniciando...')
        let t1=JS.setT1()
        let t2=JS.setT2()
        let t3=JS.setT3()
        let tf=t1+'\n'+t2+'\n'+t3
        unik.setFile('fullScript.js', tf)
        logView.showLog(tf)
    }
}
