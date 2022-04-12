const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "prime"
})

app.get('/history', (req, res) => {
    db.query("SELECT * FROM `history`", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.post('/add', (req, res) => {


    const startnum = req.body.startnum;
    const endnum = req.body.endnum;
    let i = startnum;
    let countnum = 0;
    let n = "";
    for (i; i <= endnum; i++) {
        if ((i === 1 || i % 2 === 0 || i % 3 === 0 || i % 5 === 0 || i % 7 === 0)
            && (i !== 2 && i !== 3 && i !== 5 && i !== 7)) {
            continue;
        }
        n+=i+" , "
        countnum += 1
    }
    

    db.query("INSERT INTO `history` (`hisid`, `startnum`, `endnum`, `primenum`, `countnum`, `hisdate`) VALUES (NULL, ?, ?, ?, ?, NOW())",
        [startnum, endnum,n,countnum]), (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send("บันทึกข้อมูลสำเร็จ");
            }
        }


})

app.listen('3001', () => {
    console.log('Server run Port 3001');
})