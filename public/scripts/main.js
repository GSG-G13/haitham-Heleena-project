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

