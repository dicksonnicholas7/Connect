$(document).ready(function() {

     let table = $("#jobs_all_tb").DataTable({
        "pagingType": "simple",
        "pageLength": 7,
        "dom": "lrtip",
        "ordering": false,
        "info":     false,
        "searching": true,
        "lengthChange": false,
    });

    $("#jobs_all_tb_next").html("");
    $("#jobs_all_tb_previous").html("");
    $("#jobs_all_tb_next").addClass("fa fa-angle-right");
    $("#jobs_all_tb_previous").addClass("fa fa-angle-left");

    function colFilter(searchValue, col){
        table.columns(parseInt(col)).search(searchValue).draw();
    };
    
    $('#job_search').on( 'keyup', function () {
        table.search( this.value ).draw();
     });

     $("#jobs_all_tb tbody").on("click", "tr", function(){
        let data = table.row(this).data();
        let jobId = data[0];

        $.ajax({
            url:'/user/job/'+jobId,
            type:'get',
            data:{"jobId": jobId},
            success:function(response){
                $("#jobId").text(response.id);
                $("#job_title").text(response.title);
                $("#postedBy").text(response.firstname);
                $("#cityCountry").text(response.city +", "+ response.country);
                $("#description").text(response.details);
                $("#price").text(response.price);
                // $("#skills").text(response.job_title);
            }
        });



     });


});