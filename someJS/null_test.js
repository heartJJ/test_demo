var a = null;

const fun = () => {
  if(Object.prototype.toString.call(a) === '[object Null]'){
    console.log(123);
  } else {
    console.log(456);
  }
}

fun();