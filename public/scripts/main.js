const listOption = document.getElementById('listOption');


function showSurah(arr){
  
  let divResult = document.querySelector(".main-result");
  divResult.textContent = "";
  divResult.style = "display:block";

arr.forEach((ele)=>{
  const part= document.createElement('p');
  part.className = "ayah";
  part.textContent= ele.text;
  divResult.appendChild(part);
}
);
}
function createlist (arr){
    listOption.textContent = "";
    arr.forEach(element => {
        const option = document.createElement("option");
        option.setAttribute("value",element.search_key);
        option.setAttribute("id",element.number);
        listOption.appendChild(option);
        });
}

function fetch(path,cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
        cb(data);
      } else {
        console.error(xhr.responseText);
      }
    }
  };
  xhr.open("GET", path, true);
  xhr.send();
}

// here is the dom sending requests
const search_input = document.getElementById("inputField");

search_input.addEventListener("keyup", function (event) {
  fetch(`/api/search=${search_input.value}`,createlist);
});

const search_button = document.getElementById("searchBtn");
search_button.addEventListener('click',()=>{
  const node = document.querySelector(`option[value="${search_input.value}"]`)
  fetch(`/api/selected=${node.id}`,showSurah);

    console.log(node.id)
});