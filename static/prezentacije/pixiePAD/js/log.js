/* Main JavaScript file for logging, etc.*/
/*        (c) 1999 Strahinja Radic       */

var msie = navigator.appName.indexOf('Explorer') != -1;
var nn = navigator.appName.indexOf('Netscape') != -1;
var ver = parseFloat(navigator.appVersion);

function isCompatible() {
  return (msie && (ver >= 3.0)) || (nn && (ver >= 4.0));
}

function focusFirst(formName, elementName){
  if (isCompatible()) {
  	var elem = ''; // local var
	if (nn) { // if Netscape
		elem = 'document.forms["' + formName + '"].'
			+ elementName;
	} else { // IE, etc.
		elem = '' + formName + '.' + elementName;
	}
  	var cmd = elem + '.focus();'; // compatible cmd
  	eval(cmd); // execute the compatible cmd
  }
}

function doFalseLogin() {
  if (isCompatible()) {
    var cmd = 'document.location.href = "logged.html";';
	eval(cmd);
  }
}