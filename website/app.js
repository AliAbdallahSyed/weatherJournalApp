/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
var date = new Date();
var url = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const key = "&appid=b7d877b5cc63eb61fc265e05fae96b9f&units=imperial";

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', (e) =>{
    var zipCode = document.getElementById("zip").value;
    var feel = document.getElementById("feelings").value;
    weather(url, zipCode, key)
        .then((data) =>{
            console.log(data)
            sendData('/add', {currentDate: newDate, temper: data.cnt, contentOfFeelings: feel});
            update();
        })

});

/* Function to GET Web API Data*/
var weather = async(url, zipCode, key) =>{
    var response = await fetch(url+zipCode+key)
    try{
        var data = await response.json();
        return data
    } catch(err) {
        console.log("somthing went wrong" + err);
    }
}
/* Function to POST data */
var sendData = async(url="", data={}) =>{
    var response = await fetch(url, {method:"POST", credentials:"same-origin", headers:{"Content-Type":"application/json",}, body:JSON.stringify(data)});
    try{
        var newData = await response.json();
        return newData
    } catch(err){
        console.log("somthing went wrong" + err);
    }
}

var update = async() => {
    var request = await fetch('/all');
    try{
        var totalData = await request.json();
        document.getElementById('date').innerHTML = totalData.currentDate;
        console.log(totalData)
        document.getElementById('temp').innerHTML = totalData.temper;
        document.getElementById('content').innerHTML = totalData.contentOfFeelings;
    } catch(err) {
        console.log("somthing went wrong" + err);
    }
}