var dburl = "http://osprey2.towson.edu:5432";
var currentTable;
(function ($) {
    "use strict";
    $.ajaxSetup({
        crossDomain: true,
        dataType: "json",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    $(document).on("click", "#chapter-save", function () {
        $.ajax({
            url: dburl + "/chapter/create",
            type: "POST",
            data: JSON.stringify({
                chapterName: $("#chapter-save-name").val(),
            }),
            success: function (data) {
                alert("Chapter created");
                buildChapterDataTable();
            },
            error: function (data) {
                console.log(data);
                alert(data);
            }
        });
    });

    $(document).on("click", "#chapter-edit", function () {
        $.ajax({
            url: dburl + "/chapter/update",
            type: "POST",
            data: JSON.stringify({
                chapterId: $("#edit-chapterLabel").data("chapterId"),
                chapterName: $("#chapter-edit-name").val(),
                charterDate: $("#chapter-edit-date").val(),
                chapterStatus: $("#chapter-edit-status").val()
            }),
            success: function (data) {
                alert("Chapter Edited");
                buildChapterDataTable();
            },
            error: function (data) {
                console.log(data);
                alert(data.responseJSON.error);
            }
        });
    });

    $(document).on("click", "#prospect-save", function () {
        $.ajax({
            url: dburl + "/chapter/" + getCookie("chapter") + "/prospects/add",
            type: "POST",
            data: JSON.stringify({
                name: $("#prospect-save-name").val(),
                email: $("#prospect-save-email").val(),
                phone: $("#prospect-save-phone").val(),
                bidStatus: $("#prospect-save-bidStatus").val()
            }),
            success: function (data) {
                alert("Prospect created");
                buildProspectDataTable();
            },
            error: function (data) {
                if (data.status == 409) {
                    alert("Prospect already exists");
                }
                else {
                    console.log(data);
                    alert(data.responseJSON.error);
                }
            }
        });
    });
    
    $(document).on("click", "#prospect-edit", function () {
        $.ajax({
            url: dburl + "/chapter/" + getCookie("chapter") + "/prospects/update",
            type: "POST",
            data: JSON.stringify({
                name: $("#prospect-edit-name").val(),
                email: $("#prospect-edit-email").val(),
                phone: $("#edit-prospectLabel").data("prospectId"),
                bidStatus: $("#prospect-edit-bidStatus").val()
            }),
            success: function (data) {
                alert("Prospect Edited");
                buildProspectDataTable();
            },
            error: function (data) {
                console.log(data);
                alert(data.responseJSON.error);
            }
        });
    });

    $(document).on("click", "#member-edit", function () {
        $.ajax({
            url: dburl + "/chapter/" + getCookie("chapter") + "/members/update",
            type: "POST",
            data: JSON.stringify({
                rollNo: $("#edit-memberLabel").data("rollNo"),
                name: $("#member-edit-name").val(),
                email: $("#member-edit-email").val(),
                phone: $("#member-edit-phone").val(),
                status: $("#member-edit-status").val(),
                inductionDate: $("#member-edit-induction").val(),
                initiationDate: $("#member-edit-initiation").val(),
            }),
            success: function (data) {
                alert("Member Edited");
                buildMembersDataTable();
            },
            error: function (data) {
                console.log(data);
                alert(data.responseJSON.error);
            }
        });
    });

    $(document).on("click", "#officer-create", function () {
        $.ajax({
            url: dburl + "/chapter/" + getCookie("chapter") + "/roles/add",
            type: "POST",
            data: JSON.stringify({
                rollNo: $("#officer-create-rollNo").val(),
                title: $("#officer-create-title").val(),
                startDate: $("#officer-create-startDate").val(),
                eboard: $("#officer-create-eboard").val(),
            }),
            success: function (data) {
                alert("Officer created");
                buildOfficerDataTable();
            },
            error: function (data) {
                console.log(data);
                alert(data);
            }
        });
    });

    $(document).on("click", "#officer-edit", function () {
        $.ajax({
            url: dburl + "/chapter/" + getCookie("chapter") + "/roles/update",
            type: "POST",
            data: JSON.stringify({
                rankId: $("#edit-officerLabel").data("rankId"),
                rollNo: $("#officer-edit-rollNo").val(),
                title: $("#officer-edit-title").val(),
                startDate: $("#officer-edit-startDate").val(),
            }),
            success: function (data) {
                alert("Officer Edited");
                buildOfficerDataTable();
            },
            error: function (data) {
                console.log(data);
                alert(data.responseJSON.error);
            }
        });
    });

    $(document).on("click", "#invoice-create", function () {
        $.ajax({
            url: dburl + "/chapter/" + getCookie("chapter") + "/statements/add",
            type: "POST",
            data: JSON.stringify({
                amount: $("#invoice-create-amount").val(),
                date: $("#invoice-create-date").val(),
                desc: $("#invoice-create-desc").val(),
                type: $("#invoice-create-type").val(),
            }),
            success: function (data) {
                alert("Invoice created");
                buildInvoiceDataTable();
            },
            error: function (data) {
                console.log(data);
                alert(data);
            }
        });
    });
})(jQuery);

function editchapter(chapterId) {
    $.ajax({
        url: window.dburl + "/chapter/" + chapterId,
        type: "GET",
        success: function (data) {
            var aobject = data
            $("#edit-chapterLabel").data("chapterId", aobject.chapterId);
            $("#chapter-edit-name").val(aobject.chapterName);
            $("#chapter-edit-date").val(aobject.charterDate);
            $("#chapter-edit-status").val(aobject.chapterStatus);
        }
    });
}

function editprospect(prospectId) {
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/prospects/" + prospectId,
        type: "GET",
        success: function (data) {
            var aobject = data
            $("#edit-prospectLabel").data("prospectId", aobject.phone);
            $("#prospect-edit-name").val(aobject.name);
            $("#prospect-edit-email").val(aobject.email);
            $("#prospect-edit-bidStatus").val(aobject.bidStatus);
        }
    });
}

function editmember(rollNo) {
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/members/" + rollNo,
        type: "GET",
        success: function (data) {
            var aobject = data
            $("#edit-memberLabel").data("rollNo", aobject.chapterMember.rollNo);
            $("#member-edit-name").val(aobject.name);
            $("#member-edit-email").val(aobject.email);
            $("#member-edit-phone").val(aobject.phone);
            $("#member-edit-status").val(aobject.status);
            $("#member-edit-induction").val(aobject.inductionDate);
            $("#member-edit-initiation").val(aobject.initiationDate);
        }
    });
}

function editofficer(rankId) {
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/roles/" + rankId,
        type: "GET",
        success: function (data) {
            var aobject = data
            $("#edit-officerLabel").data("rankId", aobject.rank);
            $("#officer-edit-rollNo").val(aobject.member.chapterMember.rollNo);
            $("#officer-edit-title").val(aobject.title);
            $("#officer-edit-startDate").val(aobject.startDate);
            if (aobject.eboard) {
                $("#officer-edit-eboard").val("true");
            } else {
                $("#officer-edit-eboard").val("false");
            }
        }
    });
}

function deleteofficer(rankId) {
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/roles/delete",
        type: "POST",
        data: JSON.stringify({
            rankId: rankId
        }),
        success: function (data) {
            alert("Officer Deleted");
            buildOfficerDataTable();
        }
    });
}

function reportMember(prospect) {
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/extendbid",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            phone: prospect
        }),
        success: function (data) {
            if(confirm("Report Successful! Visit Member's Page?")){
                window.location.href = "members.html";
            }
            else {
                buildProspectDataTable();
            }
        },
        error: function (data) {
            console.log(data);
            alert("THERE WAS AN ERROR");
        }
    });
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
    location.reload();
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function buildChapterDataTable() {
    if (currentTable) {
        currentTable.destroy();
    }
    $.ajax({
        url: window.dburl + "/chapter/",
        type: "GET",
        error: function (data) {
            console.log(data);
            alert(data.responseJSON.error);
        },
        success: function (data) {
            console.log(data);
            var aobject = data
            currentTable = $('#chapter-table').DataTable({
                data: aobject,
                columns: [{
                    data: "chapterName",
                    title: "Chapter Name"
                },
                {
                    data: "charterDate",
                    title: "Chapter Date"
                },
                {
                    data: "chapterStatus",
                    title: "Chapter Status"
                },
                {
                    data: "chapterMembers",
                    title: "Chapter Members"
                },
                {
                    data: "chapterId",
                    render: function (data) {
                        return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit-chapter" onclick="editchapter(' + data + ')" class="btn btn-info btn-sm">Edit</a>';
                    }

                },
                {
                    data: "chapterId",
                    render: function (data) {
                        if (getCookie("chapter") != data) {
                            return '<a href="#" data-chapterID="' + data + '" onclick="setCookie(`chapter`,' + data + ')" class="chapter-select btn btn-success btn-sm">Select</a>';
                        }
                        else {
                            return '<a href="#" data-chapterID="' + data + '" class="chapter-select btn btn-secondary btn-sm">Selected</a>';
                        }
                    }
                }
                ]
            });
        }
    });
}

function buildProspectDataTable() {
    if (currentTable) {
        currentTable.destroy();
    }
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/prospects",
        type: "GET",
        error: function (data) {
            console.log(data);
            alert(data.responseJSON.error);
        },
        success: function (data) {
            console.log(data);
            var aobject = data
            currentTable = $('#prospect-table').DataTable({
                data: aobject,
                columns: [{
                    data: "name",
                    title: "Full Name"
                },
                {
                    data: "email",
                    title: "Email"
                },
                {
                    data: "phone",
                    title: "Phone Number"
                },
                {
                    data: "bidStatus",
                    title: "Status"
                },
                {
                    data: "phone",
                    render: function (data) {
                        return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit-prospect" onclick="editprospect(' + data + ')" class="btn btn-info btn-sm">Edit</a>';
                    }

                },
                {
                    data: "phone",
                    render: function (data) {
                        return '<a href="#" onclick="reportMember(' + data + ')" class="chapter-select btn btn-success btn-sm">Add to Roster</a>';
                    }
                }
                ]
            });
        }
    });
}

function buildMembersDataTable() {
    if (currentTable) {
        currentTable.destroy();
    }
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/members",
        type: "GET",
        error: function (data) {
            console.log(data);
            alert(data.responseJSON.error);
        },
        success: function (data) {
            console.log(data);
            var aobject = data
            currentTable = $('#member-table').DataTable({
                data: aobject,
                columns: [{
                    data: "name",
                    title: "Full Name"
                },
                {
                    data: "email",
                    title: "Email"
                },
                {
                    data: "phone",
                    title: "Phone Number"
                },
                {
                    data: "status",
                    title: "Status"
                },
                {
                    data: "inductionDate",
                    title: "Induction Date"
                },
                {
                    data: "initiationDate",
                    title: "Initiation Date"
                },
                {
                    data: "chapterMember",
                    render: function (data) {
                        return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit-member" onclick="editmember(' + data.rollNo + ')" class="btn btn-info btn-sm">Edit</a>';
                    }
                }
                ]
            });
        }
    });
}

function buildOfficerDataTable() {
    if (currentTable) {
        currentTable.destroy();
    }
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/roles",
        type: "GET",
        error: function (data) {
            console.log(data);
            alert(data.responseJSON.error);
        },
        success: function (data) {
            console.log(data);
            var aobject = data
            currentTable = $('#officer-table').DataTable({
                data: aobject,
                columns: [{
                    data: "title",
                    title: "Position"
                },
                {
                    data: "member.name",
                    title: "Name",
                },
                {
                    data: "member.phone",
                    title: "Phone Number",
                },
                {
                    data: "startDate",
                    title: "Start Date"
                },
                {
                    data: "eboard",
                    title: "Is Exeuctive Board?",
                    render: function (data) {
                        if (data) {
                            return "Yes";
                        }
                        else {
                            return "No";
                        }
                    }
                },
                {
                    data: "rank",
                    render: function (data) {
                        return '<a href="#" data-bs-toggle="modal" data-bs-target="#edit-officer" onclick="editofficer(' + data + ')" class="btn btn-info btn-sm">Edit</a>';
                    }
                },
                {
                    data: "rank",
                    render: function (data) {
                        return '<a href="#" onclick="deleteofficer(' + data + ')" class="btn btn-danger btn-sm">Delete Role</a>';
                    }
                }
                ]
            });
        }
    });
}
function buildInvoiceDataTable() {
    if (currentTable) {
        currentTable.destroy();
    }
    $.ajax({
        url: window.dburl + "/chapter/" + getCookie("chapter") + "/statements",
        type: "GET",
        error: function (data) {
            console.log(data);
            alert(data.responseJSON.error);
        },
        success: function (data) {
            console.log(data);
            var aobject = data
            currentTable = $('#statements-table').DataTable({
                data: aobject,
                columns: [{
                    data: "ref_id",
                    title: "#"
                },
                {
                    data: "statementType",
                    title: "Statement Type",
                },
                {
                    data: "date",
                    title: "Date",
                },
                {
                    data: "description",
                    title: "Description",
                },
                {
                    data: "Amount",
                    title: "Amount",
                }
                ]
            });
        }
    });
}