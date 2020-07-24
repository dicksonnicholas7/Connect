function ShowJobTables(){

if (document.getElementById('jobPosted').style.display === 'none'){
    document.getElementById('jobPosted').style.display = 'block';
    document.getElementById('jobsAwarded').style.display = 'none';
    document.getElementById('jobsProgress').style.display = 'none';
    document.getElementById('jobsCompleted').style.display = 'none';
}
else{
    document.getElementById('jobPosted').style.display = 'none';
}
}

function ShowProgressTables (){
    if (document.getElementById('jobsProgress').style.display === 'none'){
        document.getElementById('jobsProgress').style.display = 'block';
        document.getElementById('jobsAwarded').style.display = 'none';
        document.getElementById('jobPosted').style.display = 'none';
        document.getElementById('jobsCompleted').style.display = 'none';
    } 
    else{
        document.getElementById('jobsProgress').style.display = 'none';
    }
}

function ShowCompleted(){
    if (document.getElementById('jobsCompleted').style.display === 'none'){
        document.getElementById('jobsCompleted').style.display = 'block';
        document.getElementById('jobsAwarded').style.display = 'none';
        document.getElementById('jobPosted').style.display = 'none';
        document.getElementById('jobsProgress').style.display = 'none';
    }  
    else{
        document.getElementById('jobsCompleted').style.display = 'none';
    }
}

function ShowAwarded(){
    if (document.getElementById('jobsAwarded').style.display === 'none'){
        document.getElementById('jobsAwarded').style.display = 'block';
        document.getElementById('jobsCompleted').style.display = 'none';
        document.getElementById('jobPosted').style.display = 'none';
        document.getElementById('jobsProgress').style.display = 'none';
    } 
    else{
        document.getElementById('jobsAwarded').style.display = 'none';
    } 
    
}