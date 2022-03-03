import express from 'express';
const PORT = 3000;
import cors from 'cors';
import {connection} from "./DatabaseConnection.js";

const app = express();
app.use(cors());


app.get('/aptFloors', function(req, res)
{
    connection.query("SELECT * FROM `AptFloors`",  {timeout: 40000} , function(error, results, fields){
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.json(results);
    });                                                  // an object where 'data' is equal to the 'rows' we
});

app.post('/aptFloors', (req, res) =>
{
    let checkQuery = "IF NOT EXISTS(SELECT );"
    let insertQuery = "INSERT INTO `AptFloors` (floorNum,fireExits) VALUES (?,?);";
    let floorNum = req.body.floorNum;
    let fireExits = req.body.fireExits;
    connection.query(insertQuery, [floorNum,fireExits] ,(error, rows) => {
        if(error){
            res.write(JSON.stringify(error));
            res.end();
        }
        res.write(rows);
    });
});


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});