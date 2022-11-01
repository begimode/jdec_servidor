var express = require("express")
var nodemailer = require("nodemailer")
var app = express();

app.post("/send-email", (req, res) => {

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "claire.carroll78@ethereal.email", // generated ethereal user
            pass: "V7JBXPCUJUHwWv556d", // generated ethereal password
        }
    })

    var mailOptions = {
        from: "jorgelq99@gmail.com",
        to: "shirley.stamm89@ethereal.email",
        subject: "Teest",
        text: "test"
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            res.status(500).send(error.message);
        }else{
            console.log("Email enviado");
            res.status(200).json(req.body)
        }
    })
})

app.listen(3000, () => {
    console.log("servidor en -> http://localhost:3000");
})