const request =require('request')

const forcast=(latititude, longitude,callback)=>{
    console.log(latititude)
    const url='http://api.openweathermap.org/data/2.5/forecast?lat='+ latititude +'&lon='+ longitude +'&APPID=e3ff32db43da3f9074a267a41afea089'
           
    request({url:url,json:true},(error,response) => {
        if(error)
        {
            callback('unable to connect to weather service',undefined)
        }
        else if(response.body.cod==400)
        {
            callback('Unable to find location')
        }
        //console.log(response.body.cod)
       else
       {
         celsius=response.body.list[0].main.temp-273;
         feel_like=response.body.list[0].main.feels_like-273;
         callback(undefined,'Temperature is '+celsius.toFixed(2)+' degree out but the feels like temperature is '+feel_like.toFixed(2)+' degree and also '+response.body.list[0].weather[0].description+'.')
       }
        })

}
module.exports=forcast



//lat=55.7522&lon=37.6156