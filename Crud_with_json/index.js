const express=require('express')
const bodyParser=require('body-parser')
var data=require('./data.json')
const app=express();
app.use(express.json())
const fs=require('fs')
// const axios=require("axios")
// meraki_data=axios.get("https://api.merakilearn.org/courses")
// .then(resp=>{
//     meraki_data=resp.data
//     // console.log(meraki_data)
//     file=JSON.stringify(meraki_data,null,3)
//     a=fs.writeFileSync("data.json",file)
// });
app.get('/',(req,res)=>{
    res.send({message:"api is working...."})
});

app.get('/get/data',(req,res)=>{
    res.send(data)
});

app.post('/post/data',(req,res)=>{
    if (!req.body.name){
        res.status(400)
        return res.json({error:"name is required"})
    }
    const user={
        id:data.length+1,
        name:req.body.name,
        logo:req.body.logo,
        notes:req.body.notes,
        days_to_complete:req.body.days_to_complete,
        short_description:req.body.short_description,
        type:req.body.type,
        course_type:req.body.course_type,
        language_available:req.body.language_available,
    }
    data.push(user)
       a=fs.writeFileSync("data.json",JSON.stringify(data,null,3))
    res.send({message:"data post sucessfully",data:user})
});

app.put('/update/data/:id',(req,res)=>{
    let id=req.params.id
    let name=req.body.name
    let logo=req.body.logo
    let  notes=req.body.notes
    let  days_to_complete=req.body.days_to_complete
    let  short_description=req.body.short_description
    let  type=req.body.type
    let course_type=req.body.course_type
    let language_available=req.body.language_available
    let index =data.findIndex((student)=>{
        return (student.id=Number.parseInt(id))
});

if (index>=0){
    let std=data[index]
    std.name=name,
    std.logo=logo,
    std.notes=notes,
    std.days_to_complete=days_to_complete,
    std.short_description=short_description,
    std.type=type,
    std.course_type=course_type,
    std.language_available=language_available,
    res.send(std)

    a=fs.writeFileSync("data.json",JSON.stringify(data,null,3))
    res.send({message:"data put sucessfully",data:user})

}else{
    res.status(404)
}
})

app.delete('/delete/data/:id',(req,res)=>{
    let id=req.params.id
    let index =data.findIndex((student)=>{
        return (student.id=Number.parseInt(id))
});

if (index>=0){
    let std1=data[index]
    data.splice(index,1)
    // res.json(std)

    a=fs.writeFileSync("data.json",JSON.stringify(data,null,3))
    res.send({message:"data delete sucessfully",data:std1})

}else{
    res.status(404)
}
})
app.listen(3000,()=>{
    console.log("listening on port 3000")
})