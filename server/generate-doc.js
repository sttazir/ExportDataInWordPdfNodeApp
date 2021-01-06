var PizZip = require('pizzip');
var Docxtemplater = require('docxtemplater');
var fs = require('fs');
var path = require('path');
var conf = require('../config/config.json').DEV;

function getworddoc(data)
{
    return new Promise((resolve, reject) => {
        
        //////// editing ///
        //console.log("data is"+ JSON.stringify(data));
        var content = fs.readFileSync(path.join(__dirname, conf.FS.InputTemplate1), 'binary');

        var zip = new PizZip(content);
            var doc;
            try {
                doc = new Docxtemplater(zip);
            } catch(error) {
                reject(error);
            }

            doc.setData(data);
            
            try {
                doc.render()
            }
            catch (error) {
                reject(error);
            }

            var buf = doc.getZip().generate({type: 'nodebuffer'});
            fs.writeFile(path.join(__dirname, conf.FS.OutputDocx1), buf, {}, (err) => {
                resolve(buf);
            });
    });
}

module.exports.getworddoc = getworddoc;