const fs = require('fs')
const axios = require("axios");
meraki_data = axios.get("https://api.merakilearn.org/courses")
    .then(resp => {
        meraki_data = resp.data
        file = JSON.stringify(meraki_data, null, 3)
        a = fs.writeFileSync("data.json", file)

    });
var create = require('../model/database')
const meraki = require('./data.json')

for (i of meraki) {
    create("mydata").insert({
        name: i.name,
        logo: i.logo,
        notes: i.notes, 
        days_to_complete: i.days_to_complete,
        short_description: i.short_description, 
        type: i.type, 
        course_type: i.course_type, 
    })
        .then(() => {
            console.log("insert");
        })
        .catch((error) => {
            console.log(error)
        })
}

