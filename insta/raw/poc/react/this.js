let myobj ={
    name : "shubham",
    sayHi: function(){
        console.log(this.name);
        console.log(this==global);
        function inner(){
            console.log(this==global);
        }inner();
    }
}

myobj.sayHi();
