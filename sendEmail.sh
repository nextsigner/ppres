#!/bin/bash
echo "$1" | mail -a "Content-Type: text/html; charset=UTF-8" -a "From: $4 <pizarromario@gmail.com>" -a "Cc: RMP <qtpizarro@gmail.com>" -s "$2" "$3"
