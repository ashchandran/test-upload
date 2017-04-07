 var uploader = new qq.FineUploaderBasic({
    element: document.getElementById("uploader"),
    debug: true,
    request: {
        endpoint: '/upload'
    } ,
    blob: {
        defaultName: 'file'
    }
 });

 function FileUpload(file, callback) {
     // Create a new FormData object.
    var formData = new FormData();
    formData.append("qqfile", file);

    $.ajax({
        url: "/upload",
        type: 'POST',
        data: formData,
        cache: false,
        dataType: 'json',
        processData: false, // Don't process the files
        contentType: false, // Set content type to false as jQuery will tell the server its a query string request
        success: function(data, textStatus, jqXHR) {
            if(typeof data.error === 'undefined') {
                // Success so call function to process the form
                console.log(data);
                callback(data);
            } else {
                // Handle errors here
                console.log('DATA ERRORS: ' + data.error);
                callback(data)
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // Handle errors here
            console.log('ERRORS: ' + errorThrown);
            callback(errorThrown);
        }
    });
 }

$("#file").on("change", function (e) {
     $("#ajax-btn").prop("disabled", false);
     $("#fine-btn").prop("disabled", false);
 });


 $("#ajax-btn").on("click", function () {
     var fileEle = document.getElementById("file");
     FileUpload(fileEle.files[0], function (data) {
         console.log(data);
     })
 });

 $("#fine-btn").on("click", function () {
     var fileEle = document.getElementById("file");
     uploader.addFiles(fileEle.files[0])
 })