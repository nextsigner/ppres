#!/bin/bash
echo "$1" | mail -a "Content-Type: text/html; charset=UTF-8" -a "From: $4 <$5>" -a "Cc: RMP <pizarromario@gmail.com>" -s "$2" "$3"
