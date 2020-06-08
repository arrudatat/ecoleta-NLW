/**
 * config do banco de dados
 * 
 */

 // importar dependencias do sqlite3
 const sqlite3 = require("sqlite3").verbose() // ver mensagens quando der algum erro

 // criar objeto que ira fazer operaçoes no banco de dados
 const db = new sqlite3.Database("./src/database/database.db")
// exportar objeto db
 module.exports = db

 // utilizar o objeto de banco de dados para nossas operaçoes

/* 
 db.serialize(() => {
     // Com comandos SQL:

      //Criar uma tabela
        db.run(`
            CREATE TABLE IF NOT EXISTS places (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                image TEXT,
                name TEXT,
                address TEXT,
                address2 TEXT,
                state TEXT,
                city TEXT,
                items TEXT
            );
        `)
        
 
    
     // Inserir dados na tabela 
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
`   })


    const values = ["https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
    "Paperside",
    "Guilherme Gemballa, Jardim América",
    "Número 260",
    "Santa Catarina",
    "Rio do Sul",
    "Resíduos Eletrônicos e Lâmpadas"]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }   
        console.log("Cadastrado com sucesso")
        console.log(this)
    }
     db.run(query, values, afterInsertData)   

     
     // Consultar dados na tabela
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        console.log("Aqui estao seus registros: ")
        console.log(rows)
    })

    // Deletar dado da tabela 
    db.run(`DELETE FROM places WHERE id = 1`, function(err) {
        if(err) {
            return console.log(err)
        }
        console.log("Registo deletado com sucesso!")
    })
 })
*/