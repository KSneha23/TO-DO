const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//mongoose.connect("mongodb+srv://admin-sneha:test123@cluster0.q2lcn.mongodb.net/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser: true, useUnifiedTopology: true});

const itemSchema = {
  name:String
};

const Item = mongoose.model("Item", itemSchema);

// const item1 = new Item({
//   name:"Welcome to your TO DO list"
// });
//
// const item2 = new Item({
//   name:"Hit the + button to add"
// });
//
// const item3 = new Item({
//   name:"<--Hit this to delete an item"
// });

// const defaultItems=[];

app.get("/", (req, res)=>{

  Item.find({}, (err, foundItems)=>{
    // if(foundItems.length==0){
    //   Item.insertMany(defaultItems, (err)=>{
    //     if(err){
    //       console.log(err);
    //     }
    //     else{
    //       console.log("success");
    //     }
    //   });
    //   res.redirect("/");
    // }
      res.render("list",{listTitle: "TO DO List", newItems: foundItems});
  });

});

app.post("/", (req, res)=>{

  const itemName = req.body.todo;

  const item=new Item({
    name: itemName
  });

  item.save();

  res.redirect("/");
});

app.post("/delete", (req, res)=>{
  const checkedItemId = (req.body.checkbox);
  Item.deleteOne({_id:checkedItemId}, (err)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log("success");
      res.redirect("/");
    }
  });
});

app.get("/work", (req, res)=>{
  res.render("list", {listTitle: "Work List", newItems: workItems});
});

app.get("/about", (req, res)=>{
  res.render("about");
});

app.listen(3000, ()=>{
  console.log("app is listening");
});
