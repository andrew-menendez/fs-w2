// Functions.js 7 tests

// The arguments array; tests 1-2

var concat_string = function(){
	//console.log(arguments)
	argArray= Array.prototype.slice.call(arguments)
	

	return argArray.join("");

	};

// Higher order functions; test 3

var yourFunctionRunner= function(funcs) {
    func_results=[]
    
    argArray= Array.prototype.slice.call(arguments)
    
    console.log(argArray[0]())
    
    for (arg in argArray){
        console.log(argArray[arg])
        func_results.push(argArray[arg]())
        }
    return func_results.join("")
};

// Closure: Make adder; test 4;

var makeAdder= function(num){
    
    
    addFunc= function(x) {
        y=num
        return x+y
    };
    
    return addFunc
};

// Decorator functions
// Once: Given a function, return a new function 
// will only run once, no matter how many times it's called
// test 5
//num=0

// look into our solution, this is a hacky solution. We we are looking for you to use a 
// closure.  Review my solution and David's solution video, let me know if you have questions
var once= function(func) {
    func()
    //func.run=1
    func.run=0
    func.prototype.runcount = function runcount(){
    	
        func.run=(func.run+1)
        
        console.log(func.run)
    };
    new_func= function () {
        var num=1
        return num
    };
    
    func.prototype.runcount()
    if(func.run>0) {
        func=new_func
    };
    
    return func
};
/* This passes the test case, but I'm not sure if it's what you had in mind?
*	the "orginal" function only runs once, but after that I replace it with a 
* 	new function... not sure if this counts, so to speak.
*/


// Shared contexts; tests 6, 7

var createObjectWithTwoClosures = function(){
    // these are global variables, it is not a closure, right idea though
    // use the var keyword, and now it's a closure (in this example!).
    sharedO={}
    val=0
    sharedO.oneIncrementer = function(){
       val=(val+1)
    };
    
    sharedO.tensIncrementer = function(){
        val=(val+10)
    };
    
    sharedO.getValue = function(){
        return val
    };
    
    return sharedO
}; 



