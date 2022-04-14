const knex =require('knex')({
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:"Jabina@123",
        database:"details"  
    }
});

// function create_table(){
//     return knex.schema.createTable("mydata",function(table){
//           table.increments("id").primary();
//           table.string("name",255);
//           table.string("logo",255);
//           table.string("notes",255);
//           table.string("days_to_complete",255);
//           table.string("short_description",255);
//           table.string("type",255)
//           table.string("course_type",255)
//         })
//         .then(()=>{
//             console.log("table_created")
//         }).catch((error)=>{
//             console.log(error)
//         })
//     }
//     create_table()

module.exports=knex