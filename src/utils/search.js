function search(arr, value) {
    let filtered = arr.filter((element) => {
      if (value && element.search_key.includes(value)) {
        return true;
      }
    });
    return filtered;
  }
  module.exports = search;