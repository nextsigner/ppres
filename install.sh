#!/bin/bash
sudo chmod -R 755 .
sudo mkdir files
sudo chmod -R 755 files


#Instalando entorno de escritorio y aplicaciones necesarias para zodiacserver
#sudo apt-get install -y nano xfce4 xfce4-goodies gnome-icon-theme tightvncserver nodejs qtquick1-5-dev qtscript5-dev

sudo apt-get install -y nano

sudo apt-get install postfix mailutils libsasl2-2 libsasl2-modules
sudo dpkg-reconfigure postfix

curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs 
sudo apt-get install -y npm

npm install

npm install forever -g
npm install -g forever-service
sudo forever-service install ppres --script /root/ppres/index.js
sudo service ppres start

#echo "install.sh copiando archivo /etc/init.d/vncserver..."
#sudo cp xstartup ~/.vnc/xstartup
#sudo chmod +x ~/.vnc/xstartup

#echo "install.sh copiando archivo /etc/init.d/vncserver..."
#sudo cp vncserver /etc/init.d/vncserver
#sudo chmod +x /etc/init.d/vncserver
#sudo update-rc.d vncserver defaults

#echo "install.sh copiando archivo ~/.config/autostart/mercurio.desktop..."
#sudo mkdir ~/.config/autostart
#sudo cp mercurio.desktop ~/.config/autostart/mercurio.desktop
#sudo chmod +x ~/.config/autostart/mercurio.desktop

#echo "install.sh copiando archivo /root/mercurio-server/mercurio-server-nodejs.sh..."
#sudo mercurio-server-nodejs.sh /root/mercurio-server/mercurio-server-nodejs.sh
#sudo chmod +x /root/mercurio-server/mercurio-server-nodejs.sh

#vncserver

echo "Recordar abrir los puertos o rango de puertos 8080-8081 para el server nodejs.\n\n"
