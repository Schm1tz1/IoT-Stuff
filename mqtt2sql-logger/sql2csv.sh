#!/bin/bash
mysql -uUSER -pPASS -e "SELECT * FROM logger_xxx;" loggerdb | sed 's/\t/","/g;s/^/"/;s/$/"/'
