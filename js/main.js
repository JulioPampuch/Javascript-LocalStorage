const form = document.getElementById("novoItem")
const list = document.getElementById('lista')
const localStorageItems = JSON.parse(localStorage.getItem("items")) || []

const items = []

console.log(localStorageItems)

localStorageItems.forEach((item) => {
  createElement(item)
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const nome = event.target.elements['nome']
  const quantidade = event.target.elements['quantidade']

  const exists = localStorageItems.find((element) => {element.nome === nome.value})

  console.log(exists)
  
  const currentItem = {
    "nome": nome.value,
    "quantidade": quantidade.value
  }
  
  createElement(currentItem)

  items.push(...localStorageItems, currentItem)
  localStorage.setItem("items", JSON.stringify(items))

  nome.value = ''
  quantidade.value = ''
})


function createElement(item) {

  const newItem = document.createElement('li')
  newItem.classList.add('item')

  const itemNumber = document.createElement('strong')
  itemNumber.innerHTML = item.quantidade

  newItem.appendChild(itemNumber)
  newItem.innerHTML += item.  nome

  list.appendChild(newItem)

}
