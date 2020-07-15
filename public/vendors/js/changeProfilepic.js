
$(document).ready(function(){
    $('#image').change(function(){
        var data = new FormData() ;
        data.append('file', $( '#image' )[0].files[0]) ;
        $.ajax({
            url: '../../../controllers/changeProfilepic.php',
            type: 'POST',
            data: data,
            processData: false,
            contentType: false,
            beforeSend: function(){
               $('#preview-image').html('Loading...');
            },
            success: function(data){
                // alert(data);
               $('#preview-image').html('<img  src="'+data+'" style="width:100%"/>');

            }
        });
        return false;
    });
});

