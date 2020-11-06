const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();     //prevent the default nature of automatic refreshing
    const val = search.value;
    document.getElementById('forcast').innerHTML = 'Loading...';
    fetch('http://localhost:3000/weather?address=' + val).then((response) => {

        response.json().then((data) => {
            if (data.error) {
                document.getElementById('forcast').innerHTML =data.error; 
                
            }
            else {
                document.getElementById('forcast').innerHTML = data.forcast;
                document.getElementById('location').innerHTML = data.location;
            }
        })
    })

})
