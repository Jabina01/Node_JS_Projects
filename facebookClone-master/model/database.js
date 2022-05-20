
const knex = require('knex')({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "Papa@123",
    database: "facebook",
  },
});
knex.schema.createTable("users", function (t) {
        t.increments("user_id").primary();
        t.string("username", 250);
        t.string("password", 250);
        t.string("Email", 250);
      })
    .then(()=>{
        console.log("table created")
    }).catch(()=>{
        console.log("table already created")
      })

// frienlist
knex.schema.createTable("friendlist", function (t) {
  t.integer("user_id").unsigned().references("users.user_id");
  t.integer("friend_id", 250);
}).then(()=>{
  console.log("table created")
}).catch(()=>{
  console.log("table already created")
})

//requests
knex.schema.createTable("requests", function (t) {
  t.integer("user_id").unsigned().references("users.user_id");
  t.integer("friend_id").unsigned().references("users.user_id");;
}).then(()=>{
  console.log("table created")
}).catch(()=>{
  console.log("table already created")

})

// post table
knex.schema.createTable("post",function(t){
      t.increments('post_id').primary()
      t.integer('user_id');
      t.string("Title");
      t.string("description");
      t.string('type')
    })
    .then(()=>{
      console.log("table created")
    }).catch(()=>{
      console.log("table already created")
    })
    
module.exports=knex