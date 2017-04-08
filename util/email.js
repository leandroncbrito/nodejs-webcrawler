var config = require("../settings.json");
var nodemailer = require('nodemailer');

module.exports = {

    enviar: function (mensagem) {

        return new Promise(function (resolve, reject) {

            let transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: process.env.USERMAIL,
                    pass: process.env.PASSMAIL
                }
            });

            let mailOptions = {
                from: '"NodeJs Crawler" <' + config.to + '>',
                to: config.to,
                subject: 'NodeJs Crawler ✔',
                html: mensagem
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject();
                    return console.log(error);
                }
                console.log('Mensagem %s enviada: %s', info.messageId, info.response);
                resolve();
            });

            transporter.close();

        });
    }
};