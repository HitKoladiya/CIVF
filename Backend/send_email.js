const nodemailer = require('nodemailer');



async function sendEmail(email,data){
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: '22ehe009@charusat.edu.in',
            pass: 'Hit_Lo_123456'
        }
    });

    let mailDetails = {
        from: '22ehe009@charusat.edu.in',
        to: email,
        subject: 'CIVF charusat',
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
        <br>
        <br>
            <div>Thanks For Registration</div>
 
</body>
</html>
        </body>
        </html>`
    };

    await mailTransporter.sendMail(mailDetails,function(err, data) {
        if(err) {
            console.log("No recipients defined");
            return "No recipients defined"
        } else {
            console.log('Email sent successfully');
            return 'Email sent successfully'
        }
    });
}

// console.log(sendEmail("hitkoladiya3@gmail.com,jaykeraliya0@gmail.com","hii jay"))
exports.sendEmail=sendEmail;
