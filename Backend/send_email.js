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
        html:`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <div>hii i am hit</div>
            <br>
            <form>
                
                <div>Username : jay</div>
                
                
                <div>Email id : jaykeraliya0@gmail.com</div>
                <br><br>
            </form>
            <br>
            <br>
            <div>Thanks For Registration</div>
 
</body>
</html>
        </body>
        </html>`
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Err:',err);
        } else {
            console.log('Email sent successfully');
        }
    });
}

// sendEmail("hitkoladiya3@gmail.com,jaykeraliya0@gmail.com","hii jay")
exports.sendEmail=sendEmail;