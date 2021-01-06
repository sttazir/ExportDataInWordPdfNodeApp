var db = require('../database').pool;
var queryString = require('../query/query');

function getDataFromDB(bill, comp, from, to, orderId)
{
    var query = getQuery(bill, comp, from, to, orderId);
    return new Promise((resolve, reject) => {
        db.connect((err) => {
            if(err)
            reject(err);
            else
            {
                db.query(query, (err, record) => {
                    if(err)
                    reject(err);
                    else
                    resolve(record);
                });
            }
        });
    });
}

function getQuery(bill, comp, from, to, orderId)
{
    if(orderId === 2)
    return queryString.booking(comp, from, to);
    if(orderId === 6)
    return queryString.dispatched(comp, from, to);
    if(orderId === 10)
    return queryString.received(comp, from, to);
    if(orderId === 7)
    return queryString.delivered(comp, from, to);
    if(orderId === 1)
    return queryString.billNoView(comp, from, to, bill);
    else
    return queryString.defaultCase(comp, from, to, bill);
}

module.exports.getDataFromDB = getDataFromDB;