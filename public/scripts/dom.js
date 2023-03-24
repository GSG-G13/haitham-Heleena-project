const listOption = document.getElementById("listOption");
const search_input = document.getElementById("inputField");
const search_button = document.getElementById("searchBtn");
function showSurah(arr) {
  let divResult = document.querySelector(".main-result");
  divResult.textContent = "";
  divResult.style = "display:block";
  arr.forEach((ele) => {
    const part = document.createElement("p");
    part.className = "ayah";
    part.textContent = ele.text;
    divResult.appendChild(part);
  });
}
function createList(arr) {
  listOption.textContent = "";
  arr.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", element.search_key);
    option.setAttribute("id", element.number);
    listOption.appendChild(option);
  });
}
// here is the dom sending requests
search_input.addEventListener("keyup", function (event) {
  fetch(`/api/search=${search_input.value}`, createList);
});

search_button.addEventListener("click", () => {
  const node = document.querySelector(`option[value="${search_input.value}"]`);
  fetch(`/api/selected=${node.id}`, showSurah);
});
