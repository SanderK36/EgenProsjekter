var age = Number(prompt("What is your age?"))
if(age < 0) {
    console.log("come back once you're out of the womb");
}

if(age === 21) {
    console.log("Happy 21st Birthday!");
}

if(age % 2 !== 0) {
    console.log("your age is odd!") ;
}

if(age % Math.sqrt(age) === 0) {
    console.log("your age is a perfect sqare");
}