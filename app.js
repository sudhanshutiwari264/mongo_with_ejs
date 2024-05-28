const express = require('express');
const app = express();
const path = require('path')
const userModel = require('./models/user')

app.set("view engine",'ejs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,`public`)));


app.get(`/`,(req, res)=>{
  res.render(`index`)
});

app.get(`/read`,async (req, res)=>{
  let users = await userModel.find();
  res.render(`read`,{users});
});

app.post(`/create`,async (req, res)=>{
  let {name,email, image} = req.body;
  let createdUser = await userModel.create({
    image,
    email,
    name
  });
  console.log(createdUser);
  res.redirect(`/read`);
});

app.get(`/delete/:userid`,async (req,res)=>{
  let deletedUser = await userModel.findByIdAndDelete(req.params.userid);
  console.log("Delted :>",req.params.userid);
  res.redirect(`/read`);
});

app.get('/update/:userid',async (req, res)=>{
  let updateonUser =  await userModel.findById(req.params.userid)
  res.render("edit_user",{user:updateonUser})
});

app.post(`/save_details/:userid`,async (req, res)=>{
  let {name,email, image} = req.body;
  let user = await userModel.findOneAndUpdate({_id:req.params.userid},{name,email,image}, {new:true});
  res.redirect('/read')
});

app.listen(3000,(err)=>{
  if(err) console.error(err);
  else console.log(`Khada hui aaj bhi wahi`);
});