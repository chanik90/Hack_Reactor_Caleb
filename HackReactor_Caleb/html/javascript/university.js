window.onload = initialForm;

function initialForm() {
	document.forms[0].onsubmit = myFunction;

	/* This will make users to choose Public school when they picked tuition for option 
	publicSet function will be active when user clicked tuition option.
	*/
	document.getElementById("tuition").onclick = publicSet;
}

function myFunction() {
	var checking = true;
	var tagChecks = document.forms[0].getElementsByTagName("*");

	for (var i =0; i<tagChecks.length; i++) {
		if(!checkingTag(tagChecks[i])) {
			checking = false;
		}
	}

	return checking;

	function checkingTag(nameTag) {
		var sep_class ="";
		var all_classes = nameTag.className.split(" ");

		for(var j=0; j < all_classes.length; j++) {
			sep_class += checkingClass(all_classes[j]) + " ";
		}

		nameTag.className = sep_class;
 
		if(sep_class.indexOf("invalid") > -1) {
			invalid_Label(nameTag.parentNode);
			nameTag.focus();
			if (nameTag.nodeName == "INPUT") {
				nameTag.select();
			}
			return false;
		}
		return true;


		function checkingClass (nameClass) {
			var classReturn = "";

			switch(nameClass) {
				case "":
				case "invalid": 
					break;
				case "diffchoice":
					if (checking && nameTag.value == "") {
						classReturn = "invalid ";
					}
					classReturn += nameClass;
					break;
				case "radio":
					if (checking && !radioPicked (nameTag.name)) {
						classReturn = "invalid ";
					}
					classReturn += nameClass;
					break;			
				case "numCheck":
					if (checking && !numCheck(nameTag.value)) {
						classReturn = "invalid ";
					}
					classReturn += nameClass;
					break;
				case "GPACheck":
					if(checking && !GPACheck(nameTag.value)) {
						classReturn = "invalid ";
					}
					classReturn += nameClass;
					break;			
				case "email_address":
					if (checking && !emailCheck(nameTag.value)) {
						classReturn = "invalid ";
					}
					classReturn += nameClass;
					break;		
				default: 
					if (checking && !doubleCheck(nameTag, nameClass)) {
						classReturn = "invalid ";
					}
					classReturn += nameClass;
			}
			return classReturn;

			function doubleCheck(innerTag, otherID) {
				if (!document.getElementById(otherID)) {
					return false;
				}
				return (innerTag.value != "" || document.getElementById(otherID).value != "");
			}

			function radioPicked(radioName) {
				var radioSet = document.forms[0][radioName];

				if(radioSet) {
					for (k=0; k<radioSet.length; k++) {
						if (radioSet[k].checked) {
							return true;
						}
					}
				}
				return false;
			}

			function numCheck(valuable) {
				if (valuable == "") {
					return false;
				}
				var reg = "[0-9/.]";l

				for (var k=0; k<valuable.length; k++) {
					if(valuable.charAt(k) < "0") {
						return false;
					}
					if (valuable.charAt(k) != reg) {
						return false;
					}
				}
				return true;
			}

			function GPACheck(GPA) {
				if (GPA == "") {
					return true;
				}
				/* GPA must contain only numbers between 0 to 9 
				     Used Higher order funciton (callback) to check valid GPA
				*/
				return (numCheck(GPA));
			}

			function emailCheck(email_address) {
				/* Valid Email Address must not have following characters */
				var invalidString = " :;/,";

				if (email_address=="") {
					return false;
				}
				for (var k = 0; k<invalidString.length; k++) {
					var falseChar = invalidString.charAt(k);
					if (email_address.indexOf(falseChar) > -1) {
					return false;
					}
				}
				/*Valid Email adress must have one at (@) 
				    If not, it returns false and doesn't go through	
				*/
				var atCheck = email_address.indexOf("@",1);
				if (atCheck == -1) {
					return  false;
				}
				if (email_address.indexOf("@", atCheck+1) != -1) {
					return false;
				}
				/*Valid Email Address  must have one period(.) */
				var periodCheck = email_address.indexOf(".", atCheck);
				if (periodCheck == -1) {
					return false;
				}
				/*Email Address should only have at most three letters after periodCheck
				(.com .net .org etc) */
				if (periodCheck+3 > email_address.length) {
					return false;
				}
				return true;
			}
		}
	}
	
	function invalid_Label(upperTag) {
		if (upperTag.nodeName == "LABEL") {
			upperTag.className += "invalid";
		}
	}

}

function publicSet() {
	if (this.checked) {
		document.getElementById("publicS").checked = true;
	}
}
