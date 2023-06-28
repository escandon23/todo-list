const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const _ = require("lodash")
const { read } = require("fs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://Escandon:Escandon100_jnr@cluster0.rtmanu9.mongodb.net/todoListDB")


const itemSchema = new mongoose.Schema({
  name:String
})
const Item = mongoose.model("item",itemSchema)

const item1 = new Item({
  name : "Welcome"
})

const item2 = new Item({
  name:"Add notes"
})

const item3 = new Item({
  name:"Hit + to add "
})

const defaultItems = [item1,item2,item3]

const listSchema = new mongoose.Schema({

  name:String,
  items:[itemSchema]

})

const List = mongoose.model("list",listSchema)  

const day = date.getDate();

app.get("/", function(req, res) {


  Item.find()

    .then(function(item){

      if(item == 0){

        Item.insertMany(defaultItems)

          .then(function(item){

            console.log("Items inserted")

            res.redirect("/")

          })

          .catch(function(err){

            console.log(err)

          })

        }else{

          res.render("list", {listTitle: "Today" , listItems: item})

        }  })

      
    .catch(function(err){

            console.log(err)}) 

});

app.post("/", function(req, res){

  const itemName = req.body.newItem;
  const listName = req.body.list


  const newItem = new Item({
    name : itemName
  })

  if(listName == "Today"){

    newItem.save()

    res.redirect("/")
    
  }else{

    List.findOne({name:listName})

      .then(function(list){

      
       list.items.push(newItem)

       list.save()

       res.redirect("/"+listName)

      })

      .catch(function(err){
        console.log(err)
      })
    
  }

});

app.post("/delete",function(req,res){

  const checkedItem = req.body.checkbox 

  const listName = req.body.listName

  if(listName == "Today"){

    Item.deleteOne({_id:checkedItem})

    .then(function(item){

     console.log("Item with an Id of "+checkedItem+" has been successfully deleted")

     res.redirect("/")

    })

    .catch(function(err){

      console.log(err)
    })

  }else{
    List.findOneAndUpdate({name:listName},{$pull: {items:{_id:checkedItem}}})

      .then(function(list){

        console.log(checkedItem+" item has been successfully deleted from "+list.name+" list")

        res.redirect("/"+listName)

      })

      .catch(function(err){

        console.log(err)
      })

  }

})


app.get("/:section",function(req,res){

  const section = _.capitalize(req.params.section)

  List.findOne({name:section})
   
    .then(function(document){
      if(document == null){
        
        const list = new List({
  
          name:section,
      
          items:defaultItems
        })
        list.save()

        res.redirect("/"+section)

      }else{
        
       res.render("list",{listTitle:document.name , listItems:document.items})

      }
    })

    .catch(function(err){
      console.log(err)

    })
  
})

app.listen(3000, function() {

  console.log("Server started on port 3000");

});
