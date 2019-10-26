<?php

/*
 * ANKETE.INC - Dodatne funkcije za ankete
 */

function webmaster()
{
	return "straxy@obelix.galia";
	return "mr99164@alas.matf.bg.ac.yu";
}

function raspored()
{
	global $PHP_SELF;

	if      (strstr($PHP_SELF,'iso5')) { $rasp='iso5';  }
	else if (strstr($PHP_SELF,'win1')) { $rasp='win1';  }
	else if (strstr($PHP_SELF,'iso2')) { $rasp='iso2';  }
	else if (strstr($PHP_SELF,'win0')) { $rasp='win0';  }
	else                               { $rasp='ascii'; }

	return $rasp;
}

function prikazi_rezultate($anketa)
{

	$pitodg="select pitanje,odgovor1,odgovor2,odgovor3,odgovor4,odgovor5,odgovor6,"
		."odgovor7,odgovor8,odgovor9,odgovor10,odgovor11"
		." from ankete where broj='$anketa' and raspored='".raspored()."';";

	$glasanja0="select count(glas) from glasanja where broj='$anketa' and glas=";
	$glasanja1=";";
	$max_glasanja="select count(glas) from glasanja where broj='$anketa';";

	echo "<table border=\"0\" width=\"100%\">\n";

	$veza=mysql_connect('localhost','guest','guest');
	if ($veza) {
		$rez=mysql_db_query('sumf',$pitodg,$veza);
		if ($rez) {
			$red=mysql_fetch_row($rez);
			/*echo "<tr>\n";
			echo "<td colspan=\"2\" width=\"100%\">\n";
			echo "$red[0]\n";
			echo "</td>\n";
			echo "</tr>\n";*/
			$max=mysql_db_query('sumf',$max_glasanja,$veza);
			if ($max) {
			$amax=mysql_fetch_row($max);
			if ($amax) {
			$nmax=$amax[0];
			for ($i=1; $i<=11; $i++) {
				if ($red[$i] != '') {
					$glas=mysql_db_query('sumf',$glasanja0
						.$i.$glasanja1,$veza);
					if ($glas) {
						$aglas=mysql_fetch_row($glas);
						if ($aglas) {
							$br_glasova = $aglas[0];
						} else {
							$br_glasova = 0;
						}
					}
					echo "<tr>\n";
					echo "<td width=\"50%\""
						." align=\"right\">$red[$i]"
						."<br>&nbsp;</td>\n";
					echo "<td width=\"50%\" nowrap><img"
						." src=\"../img/black.gif\""
						."width=\"";
					printf("%0.2f",$nmax?
						100*$br_glasova/$nmax:0);
					echo "\" height=\"5\"><br>$br_glasova (";
					printf("%0.2f",$nmax?
						100*$br_glasova/$nmax:0);
					echo "%)</td>\n";
					echo "</tr>\n";
				}
			}
					echo "<tr>\n";
					echo "<td width=\"50%\""
						." align=\"right\"><b><i>"
						."ukupno:</b></i><br>&nbsp;</td>\n";
					echo "<td width=\"50%\" nowrap><img"
						." src=\"../img/black.gif\""
						."width=\"";
					printf("%0.2f",$nmax?
						100*$nmax/$nmax:0);
					echo "\" height=\"5\"><br>$nmax (";
					printf("%0.2f",$nmax?
						100*$nmax/$nmax:0);
					echo "%)</td>\n";
					echo "</tr>\n";
			}
			mysql_free_result($max);
			}
			mysql_free_result($rez);
		}
	}
	echo "</table>\n";
	mysql_close($veza);
	return 0;
}

function prikazi_formular($anketa)
{

	$veza=mysql_connect('localhost','guest','guest');
	echo "<form method=\"get\" action=\"glas.php3\" name=\"anketa$anketa\">\n";
	echo "<table border=\"0\" cellspacing=\"0\" cellpadding=\"5\" width=\"100%\">\n";
	echo "<input type=\"hidden\" name=\"m_anketa\" value=\"$anketa\">\n";

	srand(time());
	echo "<input type=\"hidden\" name=\"random\" value=\"".(rand() % 1000000)."\">\n";

	$pitodg="select pitanje,odgovor1,odgovor2,odgovor3,odgovor4,odgovor5,odgovor6,"
		."odgovor7,odgovor8,odgovor9,odgovor10,odgovor11"
		." from ankete where broj='$anketa' and raspored='".raspored()."';";

	$rez=mysql_db_query('sumf',$pitodg,$veza);	
	if ($rez) {
	$odg=mysql_fetch_row($rez);
	if ($odg) {
	for ($i = 1; $i <= 11; $i++) {
		if ($odg[$i]) {
			echo "<tr>\n";
			echo "<td align=\"left\" valign=\"middle\" width=\"100%\">\n";
			echo "<input type=\"radio\" name=\"a$anketa\" value=\"$i\">\n";
			echo " ".$odg[$i]."</td>\n";
			echo "</tr>\n";
		}
	}
	}
	mysql_free_result($rez);
	}
	echo "<tr align=\"center\" valign=\"middle\">\n";
	echo "<td width=\"100%\">\n";
	echo "<input type=\"submit\" name=\"Submit$anketa\" value=\"Posalji/Po¹alji\">\n";
	echo "</td>\n";
	echo "</tr>\n";
	echo "</table>\n";
	echo "</form>\n";

	mysql_close($veza);
}

function ubaci_anketu($s_anketa)
{
	global $glasao;

	$veza=mysql_connect('localhost','guest','guest');
	$upit="select pitanje from ankete where broj='$s_anketa' and raspored='"
		.raspored()."';";	
	$rez=mysql_db_query('sumf',$upit,$veza);
	if ($rez) {
	$red=mysql_fetch_row($rez);
	mysql_free_result($rez);
	mysql_close($veza);
	}

	echo "<p>";
	if ($red) { echo $red[0]; }
	else { echo "Ne mogu da pristupim bazi!"; }
	echo "</p>\n";

	if ($glasao[$s_anketa]==1) {
		//echo "Glasao je...\n";
		prikazi_rezultate($s_anketa);
	} else {
		//echo "NIJE glasao...\n";
		prikazi_formular($s_anketa);
	}
}

function glasaj($anketa,$glas)
{
	global $REMOTE_ADDR, $glasao;
	$ret = 0;
	$glas_upit = "insert into glasanja (broj,host,glas)"
		." values ('$anketa','$REMOTE_ADDR',$glas);";

	if ($glasao[$anketa]==1) {
		$ret = 2;
	} else {

		setcookie("glasao[$anketa]","1");

		$glas_veza=mysql_connect('localhost','guest','guest');
		if ($glas_veza) {
			$uspeh=mysql_db_query('sumf',$glas_upit,$glas_veza);
			if ($uspeh) {
				$ret = 1;
			} else {
				$ret = 0;
			}
		} else {
			$ret = 0;
		}

	}
	if ($glas_veza) { mysql_close($glas_veza); }

	return $ret;	
}

function ubaci_salji_postu($naslov,$pitanje,$tema)
{
	echo "<p>$naslov</p>\n";
	echo "<form method=\"get\" action=\"posta.php3\">\n";
	echo "<table border=\"0\" cellspacing=\"0\" cellpadding=\"5\""
		." width=\"100%\">\n";
	echo "<tr>\n<td align=\"left\" valign=\"middle\" colspan=\"2\">$pitanje<br>\n";
	echo "<input type=\"hidden\" name=\"tema\" value=\"$tema\">\n";
	echo "<textarea name=\"sadrzaj\" rows=\"5\" cols=\"20\"></textarea>\n";
	echo "</td>\n</tr>\n";
	echo "<tr align=\"center\" valign=\"middle\">\n";
	echo "<td colspan=\"2\">\n";
	echo "<input type=\"submit\" name=\"Submit\" value=\"Posalji/Po¹alji\">\n";
	echo "</td>\n</tr>\n</table>\n</form>\n";
}

?>
