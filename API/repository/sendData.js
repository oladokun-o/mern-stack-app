const nodemailer = require("nodemailer");
const fs = require('fs');
const handlebars = require('handlebars');
const createFile = require('./createFile')

module.exports = {
    mailData: async (req, res) => {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        })

        let stat;

        try {
            if ((await createFile.createHtmlTable(req.body)).status === 200) {
                console.log('Successfully created html file');
                console.log('Creating PDF file...');
                stat = 200;
                if ((await createFile.createPdf()).status === 200) {
                    console.log('Successfully created PDF file');
                    console.log('Sending data to email...');
                    fs.readFile('./public/build.html', { encoding: 'utf-8' }, function (err, html) {
                        if (err) {
                            //console.log(err);
                            res.status(401).send(err)
                        } else {
                            var template = handlebars.compile(html);
                            var replacements = {};
                            var htmlToSend = template(replacements);
                            __dirname = './public';
                            var Data = {
                                from: 'oladokun@table.test',
                                to: 'oladipupoladokun@gmail.com',//'info@redpositive.in',
                                subject: 'User Data',
                                html: htmlToSend,
                                attachments: [{path: __dirname + '/build.pdf'}]
                            }
                        }
                    
                        transporter.sendMail(Data, function (err, info) {
                            if (err) {
                                console.log(err);                                
                                res.status(401).send(err)                                   
                            } else if (!err) {
                                //console.log(info) 
                                console.log('Email sent!');
                                res.status(200).send(info)
                            }
                        })
                    })
                } else {
                    res.status(401).send(err)                                   
                }
            } else {
                res.status(401).send(err)                                   
            }
        } catch (error) {
            console.log(error);
            res.status(401);
        }
    }
}
