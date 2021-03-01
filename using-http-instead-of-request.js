// modifying geo-locations.js by using http instead of request
const https = require('https');
const address = process.argv[2];
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?types=address&access_token=pk.eyJ1Ijoic2hldGhtZWV0OTkiLCJhIjoiY2tsajZnMm02MDVpZzJ3bzk5dW5iM2xzMyJ9.bajSGwdxxLGMlf6yQf7xhA&limit=1';

const request = https.request(url, (response) => {
    // Here response arrives bit by bit as input stream, hence we need to store it somewhere
    let data = '';

    response.on('data',(chunk)=>{
        // this method runs multiple time. 
        // chunk is kinda a bit and its type is buffer. Hence coverting it to string
        data = data + chunk.toString();
        // data will contain whole json response from the server
    });

    response.on('end',()=>{
        // runs only once after response has ended from the server
        const objData = JSON.parse(data);
        console.log(objData);
        const lat = objData.features[0].center[1];
        const long = objData.features[0].center[0];
        const place = objData.features[0].place_name;
        console.log('Lat : '+lat+" asnd Long: "+long);
    })

  

});
request.on('error',(error)=>{
    console.log('Error occured :'+error);
});
request.end();
