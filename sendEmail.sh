#!/bin/bash
echo "$1" | mail -a "Content-Type: text/html; charset=UTF-8" -a "From: Ppres <pizarromario@gmail.com>" -s "$2" $3
