    function isValidPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\D/g, '');
    console.log("Cleaned phoneNumber:", phoneNumber); // Log cleaned phone number

    if (phoneNumber.length !== 10) {
            return false;
        }
    return true;
    }
    function displayErrorMessage2(inputField, message) {
        inputField.after('<div class="error-message text-danger">' + message + '</div>');
    }
    function Add1(formData) {
        var phoneNumber = $('input[name=PhoneNumber]').val();

    $('.error-message').remove();

    if (!isValidPhoneNumber(phoneNumber)) {
        displayErrorMessage2($('input[name=PhoneNumber]'), "Invalid phone number");
    return false;
        } else {
            var ajaxConfig = {
        type: "POST",
    url: "/Contacts/Create",
    data: new FormData(formData),
    success: function (responseObject, textStatus, xhr) {
                    if (responseObject.erroR_CODE == "0") {

        $('div#AddUserModal1').css('display', 'none');
    document.getElementById('successModal').style.setProperty('display', 'block', 'important');

    setTimeout(function () {
        document.getElementById('successModal').style.setProperty('display', 'none', 'important');
        reloadTableAfter1();
    }, 2000);

                    } else {
        console.log("Error", responseObject)
                        document.getElementById('errorMessage').innerText = responseObject.message;

    document.getElementById('errorModal').style.setProperty('display', 'block', 'important');

    setTimeout(function () {
        document.getElementById('errorModal').style.setProperty('display', 'none', 'important');
    $('div#AddUserModal1').css('display', 'block');
                        }, 2000);

                    }
                },
    error: function (responseObject, textStatus, xhr) {
        document.getElementById('errorMessage').innerText = responseObject.message;

    document.getElementById('errorModal').style.display = 'block'; // Show the error modal

    setTimeout(function () {
        document.getElementById('errorModal').style.display = 'none';
    $('div#AddUserModal1').css('display', 'block');
                    }, 2000);
                }
            };
            }
    if ($(formData).attr('enctype') == "multipart/form-data") {
        ajaxConfig["contentType"] = false;
    ajaxConfig["processData"] = false;
            }

    $.ajax(ajaxConfig);
    return false;
        
    }

    function isFormEmpty() {
        var inputs = document.querySelectorAll('#AddUserModal1 input[type=text], #AddUserModal1 input[type=number]');
    var isEmpty = true;
    inputs.forEach(function (input) {
            if (input.value.trim() !== '') {
        isEmpty = false;
            }
        });
    return isEmpty;
    }

    function showConfirmationPopup() {
        debugger;
    var formIsEmpty = isFormEmpty();
    if (!formIsEmpty) {
        document.getElementById('confirmationPopup').style.display = 'block';
        } else {
        document.getElementById('AddUserModal1').style.display = 'none';
        }
    }

    function hideConfirmationPopup() {
        debugger;
    document.getElementById('confirmationPopup').style.display = 'none';
    $('div#AddUserModal1').css('display', 'none', 'important');

    }

    function confirmCancel() {
        debugger;
    document.getElementById('confirmationPopup').style.display = 'none';
    }
