#!/bin/bash
echo "$1" | mail -a "From: Ppres <pizarromario@gmail.com>" -s "$2" $3
