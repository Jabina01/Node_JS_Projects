const knex =require('knex')({
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:"Jabina@123",
        database:"Todo"  
    }
});


knex.schema.createTable("Users", function (t) {
        t.increments("user_id").primary()
        t.string("username",255).notNullable();
        t.string("email",255).notNullable().unique();
        t.string("password",255).notNullable()
      })
      .then(()=>{
          console.log("table_created")
      }).catch(()=>{
          console.log("table already exists")

      })


knex.schema.createTable("todolist", function (t) {
    t.increments("todo_id").primary()
    t.integer("user_id").unsigned().references("Users.id")
    t.string("title",255)
    t.string("description",255)
    })
    .then(()=>{
        console.log("table_created")
    }).catch((err)=>{
        console.log("table already exists")
    })


module.exports=knex