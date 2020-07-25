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






function showApplied(){
    if(document.getElementById('jobApplied').style.display==='none'){
        document.getElementById('jobApplied').style.display='block';
        document.getElementById('jobAwarded').style.display='none';
        document.getElementById('jobProgress').style.display='none';
        document.getElementById('jobComplete').style.display='none';

    }
    else{
        document.getElementById('jobApplied').style.display='none';
    }
        
   
}

function showAwarded(){
    if(document.getElementById('jobAwarded').style.display==='none'){
        document.getElementById('jobAwarded').style.display='block';
        document.getElementById('jobApplied').style.display='none';
        document.getElementById('jobProgress').style.display='none';
        document.getElementById('jobComplete').style.display='none';
    }
    else{
        document.getElementById('jobAwarded').style.display='none';
    }
}

function showProgress(){
    if(document.getElementById('jobProgress').style.display==='none'){
        document.getElementById('jobProgress').style.display='block';
        document.getElementById('jobApplied').style.display='none';
        document.getElementById('jobAwarded').style.display='none';
        document.getElementById('jobComplete').style.display='none';
    }
    else{
        document.getElementById('jobProgress').style.display='none';
    }
}

function showComplete(){
    if(document.getElementById('jobComplete').style.display==='none'){
        document.getElementById('jobComplete').style.display='block';
        document.getElementById('jobApplied').style.display='none';
        document.getElementById('jobAwarded').style.display='none';
        document.getElementById('jobProgress').style.display='none';
    }
    else{
        document.getElementById('jobComplete').style.display='none';
    }

}