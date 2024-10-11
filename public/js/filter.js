/**
 * Filters a list of weapons based on the user's input in the search box.
 * 
 * This function retrieves the input from the "searchBox" element, converts it to lowercase,
 * and filters the "weaponList" items. It hides any items that don't match the user's input.
 * 
 * The function displays the list when the input is not empty and hides it when empty.
 * 
 * @function
 * @example
 * // If the searchBox contains "ak", this will show all list items containing "ak" and hide others.
 * filterList();
 */
export function filterList() {
    let input = document.getElementById("searchBox");
    let filter = input.value.toLowerCase();
    let ul = document.getElementById("weaponList");
    let li = ul.getElementsByTagName("li");
  
    ul.style.display = filter ? "flex" : "none";
  
    for (let i = 0; i < li.length; i++) {
      let text = li[i].textContent || li[i].innerText;
      if (text.toLowerCase().indexOf(filter) > -1) {
        li[i].style.display = ""; 
      } else {
        li[i].style.display = "none";
      }
    }
  }
  