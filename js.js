var tries = 1;
var a = true;

var checkRecaptcha = function () {
    if (grecaptcha.getResponse().length == 0) {
        //reCaptcha not verified
        document.getElementById("submitButton").disabled = true;
    } else {
        //reCaptch verified
        document.getElementById("submitButton").disabled = false;
        document.getElementById("submitButton").style.visibility = "visible";
        console.log(document.getElementById("inputText").value + " " + document.getElementById("inputPw").value);
    }
};

function callMethods() {
    if (a) {
        if (tries > 3) {
            document.getElementById("message").innerHTML = "Too much tries try again in 10 sec";
            grecaptcha.reset();
            document.getElementById("submitButton").disabled = true;
            document.getElementById("submitButton").style.visibility = "hidden";
            setTimeout(function () {
                tries = 1;
                document.getElementById("message").innerHTML = "Now try again";
            }, 10000);
        } else {
            checkLogin();
        }
    }
}

function checkLogin() {
    console.log("try to check");

    var entUsername = "48414c4c4f";
    var entPw = "39393838313132323333";

    var newU = CryptoJS.AES.encrypt(document.getElementById("inputText").value, "Super Secret Key");
    var newP = CryptoJS.AES.encrypt(document.getElementById("inputPw").value, "Super Secret Key");
    var decryptedU = CryptoJS.AES.decrypt(newU, "Super Secret Key");
    var decryptedP = CryptoJS.AES.decrypt(newP, "Super Secret Key");

    if (a) {
        if (entUsername == decryptedU && entPw == decryptedP) {
            document.getElementById("message").style.color = "green";
            document.getElementById("message").innerHTML = "Success";
        } else {
            grecaptcha.reset();
            document.getElementById("submitButton").disabled = true;
            document.getElementById("submitButton").style.visibility = "hidden";

            document.getElementById("message").style.color = "red";
            document.getElementById("message").innerHTML = "Try again / try:" + tries;
            a = false;
            setTimeout(function () {
                a = true;
                tries++;
            }, 5000);
        }
    } else {
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "Try harder !!";
    }
}