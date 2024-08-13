const itemForm= document.getElementById('item-form');
const itemInput=document.getElementById('item-input');
const itemList=document.getElementById('item-list');
const clearBtn =document.getElementById('Clear');
const formBtn=document.querySelector('button');
let isEditMode=false;
const itemFilter=document.getElementById('filter');
function displayData(){
   const itemsFormStorage=getItemsFromStorage();
   itemsFormStorage.forEach((item)=>addItemToCode(item));
   checkUI();
}
function onAddItemSubmit(e){
e.preventDefault();
const newItem=itemInput.value.trim();
if(newItem===''){
    alert('please add an item');
    return;
}
if(isEditMode){
    const itemToEdit=itemList.querySelector('.edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode=false;


}
else{
    if(checkIfItemExists(newItem))
    {

        alert(`The item "${newItem}" aleardy exists`);
        return;
    }
}
addItemToCode(newItem);
addItemToStorage(newItem);
checkUI();
itemInput.value='';
}




function addItemToStorage(item){
    const itemsFromStorage =getItemsFromStorage();
    itemsFromStorage.push(item);

    localStorage.setItem('item',JSON.stringify(itemsFromStorage))
}
function getItemsFromStorage(){
let itemsFromStorage;
if(localStorage.getItem('item')===null){
    itemsFromStorage=[];

}
else{
    itemsFromStorage=JSON.parse(localStorage.getItem('item'));
}
return itemsFromStorage;

}


/* ===========================
         ===============
****add items in index.html****
        ==================
===============================
 */


function addItemToCode(item){
    const li=document.createElement('li');
    li.appendChild(document.createTextNode(item))
    const button=createButton('remove-item btn-link text-danger');
    li.appendChild(button);
    itemList.appendChild(li);



}
 
function createButton(classes){
    const button=document.createElement('button');
    button.className=classes;
    const icon=document.createElement('i');
    icon.className='fa-solid fa-xmark';
    button.appendChild(icon);
    return button;
}
/* ===========================
         ===============
****remove item from storage****
        ==================
===============================
 */
function  removeItemFromStorage(item){
    let itemsFromStorage=getItemsFromStorage(item.textContent);
   itemsFromStorage.filter((i)=>i!==item);
   localStorage.setItem('item',JSON.stringify(itemsFromStorage));

}
function removeItem(item){
    if(confirm(`Are you sure you want to remove the item "${item.textContent}"?`)){
        item.remove();
        removeItemFromStorage(item.textContent);
        checkUI();
    }


}


function onClickItem(e){
   if(e.target.parentElement.classList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
   }
   else if(e.target.closest('li')){
    setItemToEdit(e.target);
   }
}
function checkIfItemExists(item){
    const itemsFromStorages=getItemsFromStorage();
    return itemsFromStorages.includes(item);

}
function setItemToEdit(item){
 isEditMode=true;
 itemList.querySelectorAll('li').forEach((i)=>i.classList.remove('edit-mode'));
 item.classList.add('edit-mode');
 formBtn.innerHTMl='<i class="fa-solid fa-pen"></i>   Update Item';
 formBtn.style.backgroundColor= '#228B22';
 itemInput.value=item.textContent;
}
function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();
  
    items.forEach((item) => {
      const itemName = item.firstChild.textContent.toLowerCase();
  
      if (itemName.indexOf(text) != -1) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }
  function clearItems(){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild);
    }
    localStorage.removeItem('item');
    checkUI();
  }
function checkUI(){
    itemInput.value='';
    const item=itemList.querySelectorAll('li');
    if(item.length===0){
        clearBtn.style.display='none';
        itemFilter.style.display='none';

    }
    else{
        clearBtn.style.display= 'block';
        itemFilter.style.display='block';

    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
    formBtn.style.backgroundColor = '#333';
  
    isEditMode = false;
}



function init(){
    itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayData);


    checkUI();
}
init();