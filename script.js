const input = document.querySelector(".input");
const searchButton = document.querySelector(".search");
const output = document.querySelector(".output");

searchButton.addEventListener("click", function () {
    const fieldinput = input.value;
    console.log(`Test: ${fieldinput}`);
});