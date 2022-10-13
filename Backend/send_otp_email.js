const nodemailer = require('nodemailer');



function sendEmail(email,data){
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '21it067@charusat.edu.in',
            pass: 'iamhitpatel'
        }
    });

    let mailDetails = {
        from: '21it067@charusat.edu.in',
        to: email,
        subject: 'CIVF charusat',
        text:data
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Err:',err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

// sendEmail("jaykeraliya0@gmail.com","hii jay")
exports.sendEmail=sendEmail;