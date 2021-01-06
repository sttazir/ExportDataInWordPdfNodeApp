const fs = require('fs');
const PDFNet = require('@pdftron/pdfnet-node').PDFNet;
PDFNet.initialize();
const doc = require('./generate-doc');
const path = require('path');
var conf = require('../config/config.json').DEV;

function getpdfdoc(data)
{
    return new Promise((resolve, reject) => {
        doc.getworddoc(data).then((buf) => {
            convertDocxToPdf((err, result) => {
                if(err) reject(err);
                if(result && err === undefined)
                resolve(result);
            });
        }, (err) => {
            reject(err);
        });
    });
}

async function convertDocxToPdf(callback)
{
    try
    {

       const pdfDoc = await PDFNet.PDFDoc.create();
       await pdfDoc.initSecurityHandler();
       await PDFNet.Convert.toPdf(pdfDoc, path.join(__dirname, conf.FS.OutputDocx1));
        
        pdfDoc.save(path.join(__dirname, conf.FS.OutputPdf1), 
        PDFNet.SDFDoc.SaveOptions.e_linearized).then(() => {
           fs.readFile(path.join(__dirname, conf.FS.OutputPdf1), (err, data) => {
            if(err){
                console.log(err);
            }
            
               console.log('data is'+JSON.stringify(data));
               callback(undefined,data);

           })
        })   
         
       //callback(undefined, pdfDoc);


    //    const pdfDoc = await PDFNet.PDFDoc.create();
    //    await pdfDoc.initSecurityHandler();
    //    await PDFNet.Convert.toPdf(pdfDoc, path.join(__dirname, conf.FS.OutputPdf1));
    //    var pdf = await pdfDoc.saveMemoryBuffer(PDFNet.SDFDoc.SaveOptions.e_linearized);
    //    callback(undefined, pdf);


    }
    catch(error)
    {
        console.log(error);
        callback(error);
    }
}

module.exports.getpdfdoc = getpdfdoc;
