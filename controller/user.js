const bcrypt = require('bcrypt');
var FormData = require('../model/form')
var jwt = require('jsonwebtoken');

exports.secure = async function (req, res, next) {
  try {
      // token check
      console.log(req.headers.token);
      let token = req.headers.token
      if(!token){
          throw new Error("Token is not found")
      }

      let decoded = await jwt.verify(token, 'dharakash');
      console.log(decoded);

      let checkUser = await FormData.findById(decoded.id)

      if(!checkUser){
          throw new Error("User not found")
      }
      next()
  } catch (error) {
      res.status(404).json({
          status: "fail",
          message: error.message
      })
  }
}
exports.signUp = async function(req, res, next) {
    try {
      if (!req.body.name || !req.body.email ) {
        throw new Error("please enter all data")
      }
      if (req.body.password != req.body.conpassword) {
        throw new Error("password and confirm password are not same")
      }
      req.body.password = await bcrypt.hash(req.body.password,10)
      let data = await FormData.create(req.body)

      let token = jwt.sign({ id: data._id}, 'dharakash');

      res.status(201).json({
        status: "success",
        message: "signup successful",
        data: data,
        token
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      }) 
    }
  }
  exports.Login =  async function(req, res, next) {
    let getUser = await FormData.findOne({email: req.body.email})
    console.log(getUser);
    if (!getUser) {
      throw new Error("user not defined")
    }
    let checkpass = await bcrypt.compare(req.body.password, getUser.password)
    if (!checkpass) {
      throw new Error("password incorrect")
    }
    let token = jwt.sign({ id: getUser._id}, 'dharakash');

    try {
      res.status(201).json({
        status: "success",
        message: "login successful",
        data: getUser,
        token
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      }) 
    }
  }
  exports.allUsers =  async function(req, res, next) {
    try {
        let users = await FormData.find()
        console.log(users);
        res.status(201).json({
        status: "success",
        message: "all data found",
        data: users
      })
    } catch (error) {
      res.status(404).json({
        status: "fail",
        message: error.message
      }) 
    }
  }
  exports.User = async function (req, res, next) {
    try {
        let user = await FormData.findById(req.query.id)
        console.log(user);
        res.status(201).json({
            status: "success",
            message: "user data found",
            data: user
        })
    } catch (error) {
        res.status(404).json({
            status: "fail",
            message: error.message
        })
    }
}