let express,app,bodyparser,mongoose;

express = require('express'),   bodyparser = require('body-parser'),  mongoose = require('mongoose');

app = express();
app.set("view engine", "ejs"); //to use the ejs 
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static('public'));


  // Creating  Database Todolist
mongoose.connect('mongodb://localhost:27017/Todolist',{ useNewUrlParser: true }); 


  // Creating collection named Items
    const Itemschema = {  itemname: String  };
    const Item = mongoose.model('Item',Itemschema);
   


   // Creating collection named Lists
    const Listschema = { Listname: String,Items: [Itemschema]};
    const List = mongoose.model('List',Listschema);




 app.get("/", ( (req,res) => {

    Item.find({}, function(error,foundItems) {

	  if(error)
	    {
	      console.log(error)  
	    } 
	  else 
	   { 

	 	 if(foundItems.length === 0)
	 	  {
          
          Item.insertMany([first,second],function(error) {
		     console.log('successfully entered the data to the database.');
		     res.redirect('/');
             });
	 	  }
	 	else
	 	  {
	 		 res.render('list',{data: foundItems,Type: "Today"});
	      }
	    	
	 }
	 
});
       
}));

   




// app.get("/work", ( (req,res) => {  res.render('list',{data: Workvalue,Type: Work})  }));
app.listen(3000, ( ()  => { console.log('Server started on port 3000.');  }));

	
app.post('/',( (req,res) => {

	  
	  let enteredvalue = req.body.inputvalue,newItem;
	  let nameoflist = req.body.list;

	  newItem  = new  Item({  itemname: enteredvalue  });


	if(req.body.inputvalue 	!== '') 
	  {
     
	  if(nameoflist === 'Today' )
	     {       
            newItem.save();
            res.redirect('/');
  	     }
	  else  
	    { 
	    	List.findOne({Listname: nameoflist},function(err,foundata) {
	    		if(!err && foundata) {
	    			foundata.Items.push(newItem);
	    			foundata.save();
	    			 res.redirect('/' + nameoflist);
	    		}
	    	})
		   
	    }
	}
}));


app.post('/delete',( (req,res) => {

   let id = req.body.checkbox;
   let lsname = (req.body.listname);
    
      if(lsname == 'Today')
      {
        
        Item.findByIdAndRemove(id, function(error) {
 	      if(!error) 
 	        {
 	   	      console.log('Deleted seccessfully.');
 	          res.redirect('/');
 	        }
        });

      }
      else 
      { 

      	List.findOneAndUpdate({Listname: lsname},{$pull: {Items: {_id: id}}}, function(err,found) {
      		if(err) {
      			console.log(err);
      		} 
      		else {
                res.redirect('/'+ lsname);
      		}
      	})

      }
}));


app.get('/:customListName',function(req,res) {
	const newListname = req.params.customListName;
	
	
	List.findOne({Listname: newListname},function(err,foundata) {
		if(!err) {
			if(foundata) {
				res.render('list',{data: foundata.Items,Type: foundata.Listname});
			} else {

				let newlist = new List({
                Listname: newListname,
                Items: [first,second]
	             });

				newlist.save();
				res.redirect("/"+newListname);
			}
		}
	})
	// res.render('list',{data: Workvalue,Type: Work})
})

// Mongoose data


// const Apple = new Fruit({
//      name: 'Apple',
//      rating: 7,
//      review: 'Preety solid as a fruit.'
// });


// const Orange = new Fruit({
//      name: 'Orange',
//      rating: 7,
//      review: 'Preety soft and long as a fruit.'
// });

 // fruit.save();
// Fruit.insertMany([Apple,Orange],function(error) {
// 	if(error) {
// 		console.log(error);
// 	} else {
// 		console.log('successfully entered the fruits to the database.');
// 	}
// })


// const Banana = new Fruit({
//      name: 'Banana',
//      rating: 4,
//      review: 'Very long-long things.'
// });


// Fruit.updateOne({name: 'Sujeet'},{name: 'Sujeet Mishra'}, function(error) {

// 	if(error) {  console.log(error) } else { console.log('updated seccessfully.')}
// })



// Fruit.deleteOne({name: 'Banana'}, function(error) {

// 	if(error) {  console.log(error) } else { console.log('Deleted seccessfully.')}
// })

// Fruit.find( function(error,fruit) {
// 	if(error)  {
// 		console.log(error);
// 	} else {
// 		console.log(fruit);
// 	}
// });

   const first = new Item({
   	itemname: 'first'
   })


   const second = new Item({
   	itemname: 'second'
   })
