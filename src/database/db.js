const sql = require("sqlite3").verbose();


//criar o obj que vai fazer as ops no banco de dados
const db = new sql.Database("./src/database/database.db") //. = raiz do projeto


module.exports = db

//se rodarmos aqui, ja criamos o banco de dados

//usando o obj de banco de dados p/s operações
// db.serialize(() => {
//     // 1- Criar tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state_id INTEGER,
//             state TEXT,
//             city_id INTEGER,
//             city TEXT,
//             items TEXT
//         );
//     `)

//     //2- inserir dados
//     const query =`
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state_id,
//             state,
//             city_id,
//             city,
//             items
//         ) VALUES (
//             ?,?,?,?,?,?,?,?,?
//         );
//     `
//     const values = [
//         "https://images.unsplash.com/photo-1558583082-409143c794ca?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80",
//         "Papersider",
//         "Guilherme Gemballa, Jardim América",
//         "Nº 260",
//         15,
//         "Santa Catarina",
//         8273,
//         "Rio do Sul",
//         "Papéis e Papelão"
//     ]

//     function afterDataInserted(err) {
//         if (err) {
//             return console.log(err);
//         } else {
//             console.log("Cadastrado com sucesso");
//             console.log(this);
//         }}

//     db.run(query, values, afterDataInserted)

//     //3- consultar os dados da tabela
//     db.all(`SELECT * FROM places`, function(err,rows) {
//         if (err) {
//             return console.log(err);
//         } else {
//             console.log("Aqui estão os seus registros: ");
//             console.log(rows)
//         }
//     })
    
//     //4- deletar um dado da tabela
//     // db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
//     //     if (err) {
//     //         return console.log(err);
//     //     } else {
//     //         console.log("Registro deletado com sucesso")
//     //     }
//     // })
// })

// db.serialize(() => {
//     db.run(`DROP TABLE IF EXISTS places`, function(err) {
//         if (err) {
//             return console.log(err)
//         } else {
//             return console.log("Tabela deletada com sucesso")
//         }
//     })
// })

// db.serialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT,
//         name TEXT,
//         phone INTEGER,
//         email TEXT,
//         cep INTEGER,
//         address TEXT,
//         address2 TEXT,
//         state_id INTEGER,
//         state TEXT,
//         city_id INTEGER,
//         city TEXT,
//         items TEXT
//     )`, function(err) {
//         if (err) {
//             return console.log(err);
//         } else {
//             return console.log("Tabela criada com sucesso")
//         }
//     })
// })

// db.serialize(() => {
//     db.all(`SELECT * FROM places`, function(err,rows) {
//         if (err) {
//             return console.log(err);
//         } else {
//             console.log("Aqui estão os seus registros: ");
//             console.log(rows)
//         }
// })
// })

// db.serialize(() => {
//     db.run(`DELETE FROM places WHERE id = ?`, [5], function(err) {
//         if (err) {
//             return console.log(err);
//         } else {
//             console.log("Registro deletado com sucesso")
//         }
//     })
// })
