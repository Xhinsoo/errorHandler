const express = require("express");
const app = express();
const AppError = require("./AppError");

const verifyPassword = (req, res, next) => {
  const { password } = req.query;
  if (password === "chicken") {
    next();
  }
  //throwing new error, built in error handler catches it and display it
  throw new AppError("password required!!", 401);
};

const catchAsync = (fn)=>{
  return function (req,res,next) {
    fn(req,res,next).catch{e=>next(e) }

  }};


app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/secret/", verifyPassword, (req,res)=>{
res.send("this is secret!")
});
        
//throwing error 
app.get("/error",  (req, res) => {
  chicken.fly();
});

//401 status you don't have authority
app.get("/admin",(req,res)=>{
    throw new AppError("You are not an admin!", 401)
})

// //this custom middleware handles the error from code above, instead of built-in EH
// app.use((err, req, res, next) => {
//   console.log("****************");
//   console.log("******error*****");
//   console.log("****************");

//   // res.status(400).send("we have an error") //handles error with this middleware
//   next(err); //passing error to built-in EH
// });

//my customer ER takes the status code and message from AppError and handles it
app.use((err, req, res, next) => {
//some errors don't' have status, so default value of 500
  const { status = 500, message ="oops!" } = err;
  res.status(status).send(message);
});

app.listen(3000, (req, res) => {
  console.log("listening to 3000");
});
