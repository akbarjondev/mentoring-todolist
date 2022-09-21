// const input = document.body.querySelector("input[type='text']");
const btn = document.body.querySelector(".theme__btn");
const box = document.body.querySelector(".box");

// console.log(document.body.className);
// document.body.className = "night boshqa";

const bodyStyles = getComputedStyle(document.body);

let fz = bodyStyles.fontSize;

// setTimeout(() => {
//   console.log('work');
// }, 3000);

document.body.querySelector(".theme__small").addEventListener("click", () => {
  document.body.style.fontSize = `${Number(fz.replace("px", "")) * 0.7}px`;
});

document.body.querySelector(".theme__large").addEventListener("click", () => {
  document.body.style.fontSize = `${Number(fz.replace("px", "")) * 2.7}px`;
});

document.body.querySelector(".theme__reset").addEventListener("click", () => {
  document.body.style.fontSize = fz;
});
