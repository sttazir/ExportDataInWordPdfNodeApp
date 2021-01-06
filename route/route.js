var app = require('./app');
var fetchData = require('../server/fetch-data');
var pdf = require('../server/generate-pdf');
var path = require('path');
var doc = require('../server/generate-doc');
var conf = require('../config/config.json').DEV;


// fetch data from sql

app.post(conf.ROUTE.FetchData, (req, res) => {
    if(req.body.BillNo === undefined || req.body.CompId === undefined || req.body.FromDate === undefined
    || req.body.ToDate === undefined || req.body.OrderStatusId === undefined)
    res.status(400).send({ResponseStatus: "Bad Request"});
    else
    {
        var billno = req.body.BillNo;
        var compId = req.body.CompId;
        var fromDate = req.body.FromDate;
        var toDate = req.body.ToDate;
        var orderId = req.body.OrderStatusId;
        //Comment the below condition if you have set a default query in query.js
        if(orderId !== 2 && orderId !== 6 && orderId !== 7 && orderId !== 10 && orderId !== 1)
        {
            res.status(400).send({ResponseStatus: "Order Status Id should be 2, 6, 10, 7 or 1"});
        }
        else
        {
            fetchData.getDataFromDB(billno, compId, fromDate, toDate, orderId).then((record) => {
                if(record)
                {
                    if(record.recordset === undefined)
                    res.send(record);
                    else
                    res.send(record.recordset);
                }
                else
                res.status(404).send({ResponseStatus : "404 No Data Found"})
            }, (err) => {
                res.status(500).send({ResponseStatus : err});
            });
        }
    }
});


//  generate word 


app.post(conf.ROUTE.GetWordDoc, (req, res) => {
    var response = validateRequest(req.body);
    
    console.log("request body"+ JSON.stringify(req.body));
    //console.log(JSON.stringify(req.params));
    if(response === "Valid")
    {
        doc.getworddoc(req.body).then((buf) => {
              //res.download(path.join(__dirname, conf.FS.OutputDocx1));
             //res.send(path.join(__dirname, conf.FS.OutputDocx1));
            res.send(buf);
        }, (err) => {
            res.send({status: err})
        });


    }
    else
    {
        res.status(400).send({ResponseStatus : "400 Bad Request. " + response});
    }
});

app.get(conf.ROUTE.TestWordDoc, (req, res) => {
    var data = 
    {
        "copy": "2",
        "invoiceno": "11033",
        "invoicedate" : "25/12/2020",
        "placeofsupply" : "Kolkata",
        "dname" : "Test Khan",
        "dno" : "25",
        "daddress1" : "ABCD",
        "daddress2" : "WXYZ",
        "total1" : "2300",
        "cgstp" : "6",
        "cgsta" : "6",
        "sgstp" : "6",
        "sgsta" : "6",
        "igstp" : "2.5",
        "igsta" : "2.5",
        "totaltaxable" : "12.5",
        "taxamt" : "287.5",
        "grandtotal" : "2587.50",
        "rsinwords" : "Two Thousand Five Hundred and Eighty Seven Rupees and Fifty Paise",
        "Table" : [
        {
            "desc" : "Chair",
            "qnty" : "2",
            "rupees" : "600",
            "paise" : "00",
            "total" : "1200"
        },
        {
            "desc" : "Table",
            "qnty" : "1",
            "rupees" : "800",
            "paise" : "00",
            "total" : "800"
        },
        {
            "desc" : "Glass",
            "qnty" : "1",
            "rupees" : "300",
            "paise" : "00",
            "total" : "300"
        }
        ]
    };
    doc.getworddoc(data).then(() => {
        res.download(path.join(__dirname, conf.FS.OutputDocx));
    });
});

app.post(conf.ROUTE.GetPdfDoc, (req, res) => {
    var response = validateRequest(req.body);
    if(response === "Valid")
    {

        // pdf.getpdfdoc(req.body).then(() => {
        //     res.download(path.join(__dirname, conf.FS.OutputPdf1));
        // });

        pdf.getpdfdoc(req.body).then((buf) => {
            //res.download(path.join(__dirname, conf.FS.OutputDocx1));
           //res.send(path.join(__dirname, conf.FS.OutputDocx1));
          res.send(buf);
      }, (err) => {
          res.send({status: err})
      });

    }
    else
    {
        res.status(400).send({ResponseStatus : "400 Bad Request. " + response});
    }
});

app.get(conf.ROUTE.TestPdfDoc, (req, res) => {
    var data = 
    {
        "copy": "2",
        "invoiceno": "11033",
        "invoicedate" : "25/12/2020",
        "placeofsupply" : "Kolkata",
        "dname" : "Shahan Khan",
        "dno" : "25",
        "daddress1" : "ABCD",
        "daddress2" : "WXYZ",
        "total1" : "2300",
        "cgstp" : "6",
        "cgsta" : "6",
        "sgstp" : "6",
        "sgsta" : "6",
        "igstp" : "2.5",
        "igsta" : "2.5",
        "totaltaxable" : "12.5",
        "taxamt" : "287.5",
        "grandtotal" : "2587.50",
        "rsinwords" : "Two Thousand Five Hundred and Eighty Seven Rupees and Fifty Paise",
        "Table" : [
        {
            "desc" : "Chair",
            "qnty" : "2",
            "rupees" : "600",
            "paise" : "00",
            "total" : "1200"
        },
        {
            "desc" : "Table",
            "qnty" : "1",
            "rupees" : "800",
            "paise" : "00",
            "total" : "800"
        },
        {
            "desc" : "Glass",
            "qnty" : "1",
            "rupees" : "300",
            "paise" : "00",
            "total" : "300"
        }
        ]
    };
    pdf.getpdfdoc(data).then(() => {
        res.download(path.join(__dirname, conf.FS.OutputPdf));
    });
});

function validateRequest(data)
{
    var response = "Valid";   
    return response;
}