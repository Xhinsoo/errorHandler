Express comes with built in error handler that takes care of any errors that might be encountered in the app. This default error handling middleware function is added at the end of the middleware function stack.

If you pass an error to the next() i.e next(e) and it is not dealt with customer error handler. Express built in handler will handle it.

It shows status code and includes stack trace.
If you pass anything to next(e), express regards current request as error and will skip any remaining non-error handling routing and middleware function 


--
For synchronous code invoked by route handler and middleware, express default express handler will catch them. 

For errors returned from asynchronous () invoked by route handler and middleware, you must pass them to the next(e) function where express will catch and process them.

for e.g
if(!product){
    next(new AppError("product not found"), 404));
}

async route handler can have 3 parameters async (req,res,next). 
next(e): will trigger the EH
next(): will trigger next middleware

---
mongoose async error can be handled by try and catch{e} block, and pass them to next(e)

have different type of erros:
castError
validationError
error
--
wrapAsync(fn){
return function(req,res,next){
	fn(req,res,next).catch(e=>next(e))
}

wrapAsync returns a new function that invokes whatever we pass as parameter. 
for instance in the above ex, fn is passed.So the newly returned (), invokes that fn.

fn(req,req,res) and attaches catch method to catch any error and pass it to next(e).
