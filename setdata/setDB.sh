#!/bin/bash
mongo  127.0.0.1/ppres --eval 'db.productos.drop()' && mongo  127.0.0.1/ppres fullScript.js
a=echo $(mongo  127.0.0.1/ppres --eval 'db.productos.count()')
b=20
echo "---"$a"----"
if [ $a = $b ]
then
   echo "a is equal to b"
else
   echo "a is not equal to b"
fi

#echo "Hay un total de "$(mongo  127.0.0.1/ppres --eval 'db.productos.count()' | cut -d'127.0.0.1/' -f1)" pructos."
