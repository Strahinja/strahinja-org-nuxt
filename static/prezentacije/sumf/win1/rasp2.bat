REM ISO 8859-5
type ankete.php3 | unistd -h -uwin iso > ../iso5/ankete.php3
type glas.php3 | unistd -h -uwin iso > ../iso5/glas.php3
type posta.php3 | unistd -h -uwin iso > ../iso5/posta.php3
type ankete.inc | unistd -uwin iso > ../iso5/ankete.inc

REM WIN 1250
type ankete.php3 | unistd -h -uwin cp1250 > ../win0/ankete.php3
type glas.php3 | unistd -h -uwin cp1250 > ../win0/glas.php3
type posta.php3 | unistd -h -uwin cp1250 > ../win0/posta.php3
type ankete.inc | unistd -uwin cp1250 > ../win0/ankete.inc

REM ISO 8859-2
type ankete.php3 | unistd -h -uwin latin2 > ../iso2/ankete.php3
type glas.php3 | unistd -h -uwin latin2 > ../iso2/glas.php3
type posta.php3 | unistd -h -uwin latin2 > ../iso2/posta.php3
type ankete.inc | unistd -uwin latin2 > ../iso2/ankete.inc

REM ASCII
type ankete.php3 | unistd -h -uwin ascii > ../ascii/ankete.php3
type glas.php3 | unistd -h -uwin ascii > ../ascii/glas.php3
type posta.php3 | unistd -h -uwin ascii > ../ascii/posta.php3
type ankete.inc | unistd -uwin ascii > ../ascii/ankete.inc
