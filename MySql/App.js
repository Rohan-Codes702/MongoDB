import mysql from "mysql2/promise";

const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Rohan@12",
    database: "mysql_db",
});

console.log("MySql Connceted Sucessfully");

await db.execute("CREATE DATABASE IF NOT EXISTS mysql_db");
console.log(await db.execute("show databases"))

await db.execute(`
        CREATE TABLE Data(
        id int ,
        username varchar(50),
        age int ,
        dept varchar(50)
);
`);



await db.execute(
    `INSERT INTO Data (id, username, age, dept) VALUES (?, ?, ?, ?)`,
    [1, "Shubham", 20, "CSE"]
);

await db.execute(
    `update  Data set username =? where id=?`,
    ["Pratik", 2]);

const rows = await db.execute(`select * from Data`);
console.log(rows);