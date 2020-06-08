const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")


/* 
quando clicar no botao de pesquisar por pontos de coleta,
a pagina roxa ira aparecer
*/
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")    
})

/*
quando clicar para fechar a pagina roxa de pesquisa,
ela vai sumir
*/ 
close.addEventListener("click", () => {
    modal.classList.add("hide")
})