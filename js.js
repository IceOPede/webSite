var tries = 1;
var a = true;

/**
 * check if recaptcha is done or not, if it is verified show button and enable it, otherwise do nothing
 */
var checkRecaptcha = function () {
    if (grecaptcha.getResponse().length == 0) {
        //reCaptcha not verified
        document.getElementById("submitButton").disabled = true;
    } else {
        //reCaptch verified
        document.getElementById("submitButton").disabled = false;
        document.getElementById("submitButton").style.visibility = "visible";
    }
};

/**
 * check if he is allowed to try to login again
 * checks if user tried more then three times if he did wait 10 sec before checkLogin() can be called again
 */
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

/**
 * check if recaptcha is valid
 * encrypt entered password and compare it with the encrypt master password
 * check if login is valid
 * add a delay of one sec after each try
 * prevent this function to be called more than once all one sec
 */
function checkLogin() {
    if (grecaptcha.getResponse().length == 0) {
        //reCaptcha not verified
        document.getElementById("message").style.color = "red";
        document.getElementById("message").innerHTML = "do the reCaptcha !!!";
    } else {
        console.log("try to check");
        var entUsername = "48414c4c4f";
        var entPw = "36554961392a6c7a4e7633344d585125794f3435324b4679264841455a7745637438746a706b4445433572406739494d2662305450455e2a7961763866444659494b684d6a4a5932477a43346f404b516934782a4c74566758335a33664d6e6b696f6758";

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
}