function createDom (arr){
    const surahDiv = document.createElement("div");
    
    arr.forEach(element => {
        const surahText = document.createElement("h4");
        
    });
}

function fetch(search_key) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        const data = JSON.parse(xhr.responseText);
 
        console.log(data);
      } else {
        console.error(xhr.responseText);
      }
    }
  };
  xhr.open("GET", `/api/search=${search_key}`, true);
  xhr.send();
}

// here is the dom sending requests
const search_input = document.getElementById("search_input");

search_input.addEventListener("keyup", function (event) {
  fetch(search_input.value);
  console.log(search_input.value);
});
