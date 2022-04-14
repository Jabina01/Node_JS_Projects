const knex =require('knex')({
    client:"mysql",
    connection:{
        host:"127.0.0.1",
        user:"root",
        password:"Jabina@123",
        database:"details"  
    }
});


knex.schema.createTable("users", function (t) {
        t.increments("userid").primary()
        t.string("username",255).notNullable();
        t.string("email",255).notNullable().unique();
        t.string("password",255).notNullable()
      })
      .then(()=>{
          console.log("table_created")
      }).catch(()=>{
          console.log("table already exists")

      })



knex.schema.createTable("post", function (t) {
    t.increments("postid").primary()
    t.integer("id",255)
    t.string("title",255)
    t.string("description",255)
    })
    .then(()=>{
        console.log("table_created")
    }).catch(()=>{
        console.log("table already exists")
    })


knex.schema.createTable("likeDislike",function(t){
    t.integer('post_id')
    t.integer('user_id');
    t.boolean("like",250);
    t.boolean("dislike",250)
    })
    .then(()=>{
    console.log("table created")
    }).catch(()=>{
    console.log("table already created")
})
module.exports=knex



