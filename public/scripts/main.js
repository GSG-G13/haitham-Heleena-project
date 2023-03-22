function createlist (arr){
    const listOption = document.getElementById('listOption');
    listOption.textContent = "";
    arr.forEach(element => {
        const option = document.createElement("option");
        option.setAttribute("value",element.search_key);
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
        console.log(data);
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
  console.log(search_input.value);
});
