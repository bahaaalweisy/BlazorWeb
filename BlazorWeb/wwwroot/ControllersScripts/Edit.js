    function isValidPhoneNumber(phoneNumber) {
        phoneNumber = phoneNumber.replace(/\D/g, '');
    console.log("Cleaned phoneNumber:", phoneNumber); // Log cleaned phone number

    if (phoneNumber.length !== 10) {
            return false;
        }
    return true;
    }
    $(document).ready(function () {
        $('form').on('submit', function (event) {
            event.preventDefault();

            Edit1(this);
        });
    });
    function displayErrorMessage2(inputField, message) {
        inputField.after('<div class="error-message text-danger">' + message + '</div>');
    }
    function Edit1(formData) {
        debugger;
    var phoneNumber = $('input[name=PhoneNumber]').val();

    $('.error-message').remove();

    if (!isValidPhoneNumber(phoneNumber)) {
        displayErrorMessage2($('input[name=PhoneNumber]'), "Invalid phone number");
    return false;
        } else {
            var ajaxConfig = {
        type: "POST",
    url: "/Contacts/Edit/",
    data: new FormData(formData),
    success: function (responseObject, textStatus, xhr) {
                    if (responseObject.erroR_CODE == "0") {
        $('div#editUserModal1').css('display', 'none');

    document.getElementById('successEditModal').style.setProperty('display', 'block', 'important');

    setTimeout(function () {
        document.getElementById('successEditModal').style.setProperty('display', 'none', 'important');
        reloadTableAfter1();

                        }, 2000);
                    } else {
        console.log("Error", responseObject)
                        document.getElementById('errorMessage').innerText = responseObject.message;

    document.getElementById('errorModal').style.setProperty('display', 'block', 'important');

    setTimeout(function () {
        document.getElementById('errorModal').style.setProperty('display', 'none', 'important');
    $('div#editUserModal1').css('display', 'block');
                        }, 2000);
                    }
                },
    error: function (responseObject, textStatus, xhr) {
        document.getElementById('errorMessage').innerText = responseObject.message;

    document.getElementById('errorModal').style.display = 'block'; // Show the error modal

    document.getElementById('errorModal').style.setProperty('display', 'block', 'important');

    setTimeout(function () {
        document.getElementById('errorModal').style.setProperty('display', 'none', 'important');
                    }, 2000);
                }
            };
    if ($(formData).attr('enctype') == "multipart/form-data") {
        ajaxConfig["contentType"] = false;
    ajaxConfig["processData"] = false;
            }
    $.ajax(ajaxConfig);
    return false; // Prevent default form submission
        }
    }



