const geo_locations = require('./geo-locations.js');
const weather = require('./weather.js');
const chalk = require('chalk');

const address = process.argv[2];
if(!address)
{
    console.log('Please enter location in command line arguments');
}
// callback chaining

//callback 1
geo_locations.find_geoLocation(address ,(place,lat,long)=>{
    console.log('Place : '+place+chalk.green.inverse(' Coordinates : '+lat+' , '+long));
    
    //callback 2 inside callback 1
    weather.find_weather(lat,long,(temp)=>{
        console.log('Temperature of this area is : '+temp+' degrees');
    })

});



