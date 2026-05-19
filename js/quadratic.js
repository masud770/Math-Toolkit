function solveEquation(){

  let a = parseFloat(document.getElementById("a").value);
  let b = parseFloat(document.getElementById("b").value);
  let c = parseFloat(document.getElementById("c").value);

  let d = (b*b) - (4*a*c);

  if(d < 0){

    document.getElementById("solution").innerText =
    "No Real Solution";

    return;
  }

  let x1 = (-b + Math.sqrt(d)) / (2*a);
  let x2 = (-b - Math.sqrt(d)) / (2*a);

  document.getElementById("solution").innerText =
  `x1 = ${x1.toFixed(2)}, x2 = ${x2.toFixed(2)}`;
}