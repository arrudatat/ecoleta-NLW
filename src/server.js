/***
 * criando o servidor
 * 
 * npm - node packge manager 
 * 
 * npm init -y // criando meu projeto package.json, 
 * com informacoes sobre meu projeto
 * 
 * npm install express // primeira dependencia pra montar meu servidor
 * 
 * // a instalacao do express trouxe a pasta node_modules,
 * com as dependencias do express e o proprio express
 * 
 * // criou tambem o package-lock.json, que faz o 
 * mapeamento das dependencias do meu projeto
 * 
 * // criacao do servidor no server.js 
 * 
 * // ligar o servidor
 * node src/server.js  
 * 
 * // pode alterar o package.json para criar um atalho
 * // e nao precisar ficar escrevendo node stc/server.js
 * npm start 
 * 
 * // criando o caminho da minha aplicação
 * 
 * // protocolos HTTP -> conjunto de regras 
 * // o protocolo trabalha com verbos, 
 * // maneiras de receber e responder a pedidos 
 * // feitos pelo cliente (GET, POST, etc)
 * 
 * // toda vez que fizer alteraçoes nesse arquivo,
 * // é preciso reiniciar o servidor (npm start) 
 * // para recarregar o servidor e ver estas mudanças
 * // pra nao precisar fazer isto, instale:
 * npm install nodemon
 * 
 * // preciso tambem colocar os arquivos css e img 
 * // da pasta public como pastas que o servidor possa acessar 
 * // no navegador 
 * 
 * // feito isso pra cada arquivo html, 
 * // as paginas vao carregar normalmente
 * // preciso ainda alterar o caminho dos arquivos html que fazem a comunicaçao
 * // entre eles ex: "index.html" -> "/" "create-point.html" -> "/create-point"
 * 
 * // Template Engine 
 * // pega os arquivos HTML e transforma em um arquivo inteligente,
 * // onde eu posso inserir funçoes, loops, etc
 * npm install nunjucks
 *  
 *  ***/ 

 // chamando o express
const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// config pasta public 
server.use(express.static("public"))

// habilitar o uso do req.body na aplicaçao
server.use(express.urlencoded({ extended: true }))

// utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// configurar os caminhos (rotas) da minha aplicação

// pagina inicial 
server.get("/", (req, res) => {         // req: requisiçao, res: resposta
    return res.render("index.html") // a var __dirname indica o path que esta localizado o server.js
})

server.get("/create-point", (req, res) => {  // req: requisiçao, res: resposta
    
    // req.query: Query Strings da URL 
    //console.log(req.query)
   // return res.render("create-point.html", { saved: true })
    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body: o corpo do formulario
    // console.log(req.body)

    // inserir dados no banco de dados
    const query = `
    INSERT INTO places (
        image,
        name,
        address,
        address2,
        state,
        city,
        items
    ) VALUES (?,?,?,?,?,?,?);
`  

   const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
   ]

   function afterInsertData(err) {
       if(err) {
            console.log(err)
            return res.send("Erro no cadastro!")
       }   
       console.log("Cadastrado com sucesso")
       console.log(this)

       return res.render("create-point.html", { saved: true })

   }
    db.run(query, values, afterInsertData)   
})


server.get("/search", (req, res) => { // req: requisiçao, res: resposta
    // pegar os dados do banco de dados 

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        return res.render("search-results.html", { total: 0})
    }

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        //console.log("Aqui estao seus registros: ")
        //console.log(rows)

        const total = rows.length

        return res.render("search-results.html", { places: rows, total: total})
    })

    // mostrar a pag HTML com os dados do banco de dados
  
})

// ligar o servidor ouvindo a porta 3000
server.listen(3000)



