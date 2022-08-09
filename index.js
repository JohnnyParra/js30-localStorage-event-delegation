const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const selectAll = document.querySelector('[name=selectAll]');
const selectNone = document.querySelector('[name=selectNone]');
const deletes = document.querySelector('[name=delete]');
let items = JSON.parse(localStorage.getItem('items')) || [];

/* adds item to list */
function addItem(event){
  event.preventDefault();
  const text = (this.querySelector('[name=item]')).value;
  const item = {
    text,
    checked: false
  };

  let repeat = checkRepeats(items, item.text)
  if(!repeat){
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
  } else {
    alert("This Entry Already Exists");
  }
  this.reset();
}

/* loads in new list */
function populateList(plates, platesList){
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li>
        <input type='checkbox' data-index=${i} id='item${i}' ${plate.checked ? 'checked' : ''}/>
        <label for='item${i}'>${plate.text}</label>
      </li>
    `;
  }).join('');
}

/* toggles checkbox on click */
function toggleChecked(event) {
  if(!event.target.matches('input')) return;
   const el = event.target;
   const index = el.dataset.index;
   items[index].checked = !items[index].checked;
   localStorage.setItem('items', JSON.stringify(items));
   populateList(items, itemsList);
}

/* selects all/none and/or delete */
function actionButton(event) {
  event.preventDefault();
  let arr = [];

  if(event.target == selectAll){
    for(let i = 0; i < items.length; i++){
      items[i].checked = true;
    }
  } else if(event.target == selectNone){
    for(let i = 0; i < items.length; i++){
      items[i].checked = false;
    }
  } else{
    for( let i = 0; i < items.length; i++){
      if(items[i].checked === false){
        arr.push(items[i]);
      }
    }
    items = arr;
  }
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

/* checks for repeated entries */
function checkRepeats(objectArr, wordTwo) {
  let count = 0;
  const length = items.length;
  for(let i = 0; i < length; i++){
    if(objectArr[i].text.toLowerCase() == wordTwo.toLowerCase()){
      return true;
    } else{
      count++;
      if(count == length){
        return false;
      }
    }
  }
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleChecked);
selectAll.addEventListener('click', actionButton);
selectNone.addEventListener('click', actionButton);
deletes.addEventListener('click', actionButton);

populateList(items, itemsList);
