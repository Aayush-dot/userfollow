const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


class User{
  constructor(username,age){
      this.username=username;
      this.age=age;
      this.following=[];
  }
}

var userslist=[];

app.post("/newUser", (req,res) => {

  // console.log(req.body);
  // console.log(req.body.body.username);
  username=req.body.body.username;
  age=req.body.body.age;
  var newuser= new User(username,age);
  userslist.push(newuser);
  res.send("New User Added");
});

app.post("/follow",(req,res) => {
    user=req.body.body.follower;
    followed=req.body.body.followed;
    for(let i = 0;i<userslist.length;i++){
      if(userslist[i].username==user){
        userslist[i].following.push(followed);
      }
    }
    res.send(userslist);
    //res.send("New follow connection created");
});


app.get("/followTable",(req,res)=>{
  const followtable= new Map();
  for(let i = 0;i<userslist.length;i++){
      followtable.set(userslist[i].username,userslist[i].following);
      console.log(followtable);
    }
    res.send(followtable);
});

app.get("/usersList", (req,res)=>{
  console.log(userslist.length);
for(let i = 0;i<userslist.length;i++){
     console.log(userslist[i].username+" "+userslist[i].age);
   }
  res.send(userslist);
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});