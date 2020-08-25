#!/bin/bash
echo "$1" | mail -a "Content-Type: text/html; charset=UTF-8" -a "From: Prueba Ppres <pizarromario@gmail.com>" -a "Cc: RMP <qtpizarro@gmail.com>" -s "$2" "$3"
