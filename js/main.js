const form = document.getElementById("novoItem")
const list = document.getElementById('lista')
const localStorageItems = JSON.parse(localStorage.getItem("items")) || []

console.log(localStorageItems)

localStorageItems.forEach((item) => {
  createElement(item)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const nome = event.target.elements['nome']
  const quantidade = event.target.elements['quantidade']

  const exists = localStorageItems.find(element => element.nome === nome.value)

  const currentItem = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }
  
  if(exists) {
    currentItem.id = exists.id
    updateElement(currentItem)
    localStorageItems[localStorageItems.findIndex(element => element.id === exists.id)] = currentItem
  } else {
    currentItem.id = localStorageItems[localStorageItems.length - 1] ? (localStorageItems[localStorageItems.length - 1]).id + 1 : 0
    console.log(localStorageItems[localStorageItems.length - 1])
    createElement(currentItem)
    localStorageItems.push(currentItem)
  }

  localStorage.setItem("items", JSON.stringify(localStorageItems))
  nome.value = ''
  quantidade.value = ''
})

function createElement(item) {

  const newItem = document.createElement('li')
  newItem.classList.add('item')

  const itemNumber = document.createElement('strong')
  itemNumber.dataset.id = item.id
  itemNumber.innerHTML = item.quantidade

  newItem.appendChild(itemNumber)
  newItem.innerHTML += item.  nome

  list.appendChild(newItem)

  newItem.appendChild(deleteBtn(item.id))
}

function updateElement(item) {
  (document.querySelector("[data-id='"+item.id+"']")).innerHTML = item.quantidade 
}

function deleteBtn(id) {
  const btnEelement = document.createElement('button')
  btnEelement.innerText = 'x'

  btnEelement.addEventListener('click', (event) => {
    deleteElement(event.target.parentNode, id)
  })
  
  return btnEelement
}

function deleteElement(tag, id) {
  localStorageItems.splice(localStorageItems.findIndex(element => element.id === id), 1)
  tag.remove()
  localStorage.setItem('items', JSON.stringify(localStorageItems))
}