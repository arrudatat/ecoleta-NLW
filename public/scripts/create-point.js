/** 

definindo a função:
pegando o json dos estados no site do IBGE e populando
o selector de Estado

*/  
function populateUFs () {

    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => {return res.json() })
    .then( states => {
            for(const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
    })
   
}


populateUFs()


// populando e selecionando a cidade 

function getCities (event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a cidade</option>";
    citySelect.disabled = true

    fetch(url)
    .then((res => res.json()))
    .then( cities => {
        
            for(const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
    })


}

/**
 
 * ao selecionar uma opçao no estado, 
 * o selector de Cidade será habilitado e populado
 
 */

document.querySelector("select[name=uf]")
.addEventListener("change", getCities)

// itens de coleta

const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener('click', handleSelectedItem)
}

// atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems =[];

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou remover classes com javascript

    itemLi.classList.toggle("selected")
    
    const itemId = event.target.dataset.id

    //console.log('ITEM ID: ', itemId)

    // verificar se existem itens selecionados, se sim
    // pegar os itens selecionados e add na array

    const alreadySelected = selectedItems.findIndex( function(item) { // procurando pelo Index
        const itemFound = item == itemId // isso sera avaliado como true ou false 
        return itemFound // se true 
    })

    // se já estiver selecionado, tirar da seleçao no array

    if (alreadySelected >= 0) {
    
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
       // se não estiver selecionado, 
    // add seleçao na array
            selectedItems.push(itemId)      
    }

    //console.log('selectedItems: ', selectedItems)

    // atualizar o campo escondido com os itens selecionados
     collectedItems.value = selectedItems
}


