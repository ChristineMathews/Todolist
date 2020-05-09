const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine', 'ejs');
app.use(express.static("public"));
mongoose.connect("mongodb//localhost:27017/todolistdb",{useNewUrlParser:true});
const itemSchema={
    name:String
};
const Item=mongoose.model("Item",itemSchema);
const Item1=new Item({
    name:"Welcome to do list!"
});
const Item2=new Item({
    name:"Click + to add to the list"
});
const defaultItems= [Item1,Item2];
Item.insertMany(defaultItems,function(err){
    if(err){console.log(err);}
    else{console.log("succes");}
});


let items=[];
app.get("/",function(req,res){
    // var today=new Date();
    // var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    // var day  = today.toLocaleDateString("en-US",options);
    Item.find({},function(err,foundItems){
         console.log(foundItems); 
         res.render("list",{
            listTitle:"today",
            newListItems:foundItems
        });  
    });
   



});
app.post("/",function(req,res){
    var item=req.body.newitem;
    items.push(item);
    res.redirect("/");
});

app.listen(3000,function(){
    console.log("server started");
});