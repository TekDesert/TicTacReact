var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser') //use to get req.body

const userModel = require("../models/users")

const bcrypt = require("bcrypt");

var ObjectID = require('mongodb').ObjectID;

var mongoose = require('mongoose');

const app = express();
app.use(express.json())


// create application/json parser
var jsonParser = bodyParser.json()

router.post("/signup", jsonParser, async (req, res) => {
    
    
  userInfos = req.body;

  console.log("Registering user.... : \n" )

  console.log(req.body)


  if(userInfos.gamertag &&  userInfos.email && userInfos.password) {

      console.log("GOOD FOR REGISTER !")

      var checkAlreadyExist = await userModel.findOne({"email": userInfos.email})

      if (checkAlreadyExist) {

        res.status(409).send("User already exists") 

      }
      else {

          var crypted_passwd = bcrypt.hashSync(userInfos.password, 1);


          var newUser = {

            '_id':  new ObjectID(), //Give temporary objectId before getting the one generated
            "gamertag": userInfos.gamertag, 
            "email": userInfos.email,
            "password": crypted_passwd,
            "online": false

          }          

           userModel.create(newUser, function(err, res) {
              if (err) throw err;
              
            })

         res.status(200).send({_id: newUser._id, gamertag: newUser.gamertag, email: newUser.email})
      }


  }else{
    res.status(422).send("Missing Data") 
  }

})

router.post("/login", jsonParser, async (req, res) => {
  //CHECK USER INFORMATIONS
  console.log(req.body);

  userInfos = req.body;
   
  var userData = await userModel.findOne({"email": userInfos.email})

  if (userData) {

      if(bcrypt.compareSync(userInfos.password, userData.password)) {

          //MAKE THE USER APPEAR ONLINE
          userData.online = true;
          await userData.save();

          //RETURN THE USER INFORMATIONS WITH SUCCESS CODE
          res.status(200).send({_id: userData._id, gamertag: userData.gamertag, email: userData.email})
      }
      else {
        res.status(403).send({message: "password incorrect"})
      }

      
  } else {
    res.status(403).send({message: "user does not exist"})
  }

})

router.post("/logout", jsonParser, async (req, res) => {
  //CHECK USER INFORMATIONS
  console.log(req.body);

  userInfos = req.body;
   
  var userData = await userModel.findOneAndUpdate({"_id": mongoose.Types.ObjectId(userInfos._id)}, {"online": false})



  if (userData){

    //RETURN THE USER INFORMATIONS WITH SUCCESS CODE
    res.status(200).send("Logged out")

  } 
  else {
    res.status(403).send({message: "logout failed / user is probably already loged out"})
  }

})


router.get("/allOnline", jsonParser, async (req, res) => {
    

      var getAllOnlineUsers = await userModel.find({}).where('online').equals(true)

      if (getAllOnlineUsers) {

        res.status(200).send(getAllOnlineUsers) 

      }
      else {

        res.status(500).send({message: "error fetching all users"}) 

      }

})

router.get("/all", jsonParser, async (req, res) => {
    

  var getAllUsers = await userModel.find()

  if (getAllUsers) {

    res.status(200).send(getAllUsers) 

  }
  else {

    res.status(500).send({message: "error fetching all users"}) 

  }

})


module.exports = router;