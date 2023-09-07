let a = 10;
var b = "global";

function view() {
  a = 30;
  b = "functional";
}

if (1 == 1) {
    a = 20;
    b = "block";
  }

//view();
console.log("a==>", a);
console.log(b);
