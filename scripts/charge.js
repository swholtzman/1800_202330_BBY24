function leave(){
    document.getElementById('charge').classList.add('leave');
    document.getElementById('map').classList.add('leave');
    setTimeout( function () { location.href = "main.html"; }, 2000);
}