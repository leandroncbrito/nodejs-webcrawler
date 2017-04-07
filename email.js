var nodemailer = require('nodemailer');

var Email = function() {};

Email.prototype.enviar = function (mensagem) {

    var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: 'user@live.com',
            pass: 'pass'
        }
    });

    let mailOptions = {
        from: '"NodeJs Crawler" <user@live.com>',
        to: 'user@gmail.com',
        subject: 'NodeJs Crawler ✔',        
        html: mensagem
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Mensagem %s enviada: %s', info.messageId, info.response);
    });

    transporter.close();
}

module.exports = new Email();