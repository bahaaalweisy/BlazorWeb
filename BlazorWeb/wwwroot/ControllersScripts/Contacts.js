var EditUrl1 = "/Contacts/Edit/";
var AddUrl1 = "/Contacts/Save/";
var DeleteUrl1 = "/Contacts/Delete/";
var GetUrl1 = "/Contacts/Get/";

function PopupFormAdd1(url) {
    debugger;
    console.log(url);
    $.get(url)
        .done(function (response) {
            $('#modal-containerAdd1').html(response);
            $('#AddUserModal1').css('display', 'block');
        });
}

$(document).on('click', '.closeView2', function () {
    $('#editUserModal1').css('display', 'none');
});
$(document).on('click', 'button.btn.btn-outline-info.btn-sm.edit', function () {
    $('#editUserModal1').css('display', 'none');
});

function hideEditUserModal() {
    $('#editUserModal1').css('display', 'none');
}
function hideAddUserModal() {
    debugger
    document.getElementById('errorModal2').style.setProperty('display', 'block', 'important');

}

function handleCancel(confirm) {
    debugger
    document.getElementById('errorModal2').style.setProperty('display', 'none', 'important');
    if (confirm) {
        $('#AddUserModal1').css('display', 'none');
    }
}
function GetContacts() {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/Contacts/Index",
        beforeSend: function () {
            $('#ContentMain').html(Loaders);
        },
        success: function (Response) {
            $('#ContentMain').html(Response);
        }
    });
}

function generateRow1(item, i) {
    return `<tr role="row" class="${i % 2 === 0 ? 'even' : 'odd'}">
                <td>${i + 1}</td> <!-- Assuming 'counter' is incremented for each row -->
                <td>${item.firstName}</td>
                <td>${item.lastName}</td>
                <td>${item.email}</td>
                <td>${item.phoneNumber}</td>
                <td>
                    <a class="btn btn-primary" onclick="PopupEdit1('${item.id}');">Edit</a>
                    <a class="btn btn-danger" onclick="DeleteDialog1('${item.id}');">Delete</a>
                </td>
            </tr>`;
}
function reloadTableAfter1() {
    console.log('reloadTable() function called');
    $.ajax({
        url: GetUrl1,
        method: 'GET',
        success: function (response) {
            console.log("newTbodyHtml: ", response);
            var newTbodyHtml = '';
            var data = response || [];  // Adjust based on your actual response structure
            for (var i = 0; i < data.length; i++) {
                newTbodyHtml += generateRow1(data[i], i);
            }
            $('#Contactlist tbody').html(newTbodyHtml);  // Target specific table's tbody
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown);
        }
    });
}
function formatDate1(dateString) {
    // Implement your date formatting logic here
    // This is a simple placeholder implementation
    var date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust format as needed
}

function deleteLicence1(id) {
    debugger
    $.ajax({
        type: "POST",
        url: DeleteUrl1 + id,
        success: function (responseObject, textStatus, xhr) {
            if (responseObject.isValid == true) {

                document.getElementById('DeleteModal').style.setProperty('display', 'block', 'important');

                setTimeout(function () {
                    document.getElementById('DeleteModal').style.setProperty('display', 'none', 'important');
                    reloadTableAfter1();


                }, 2000);

            } else {
                document.getElementById('errorModal').style.setProperty('display', 'block', 'important');

                setTimeout(function () {
                    document.getElementById('errorModal').style.setProperty('display', 'none', 'important');
                }, 2000);
            }
        },


    });

}

function DeleteDialog1(id) {
    console.log(id)
    $("#dialog-confirm1").dialog({
        resizable: false,
        modal: true,
        title: "تأكيد",
        height: 250,
        width: 400,
        buttons: {
            "Yes": function () {
                $(this).dialog('close');
                deleteLicence1(id);
            },
            "No": function () {
                $(this).dialog('close');

            }
        }
    });
}

function PopupEdit1(id) {
    debugger
    var url = EditUrl1 + id;
    console.log(url);
    $.get(url)
        .done(function (response) {
            $('#modal-container1').html(response);
            $('#editUserModal1').css('display', 'block');
        });
}

$(document).ready(function () {
    $('#Contactlist').DataTable();
});

