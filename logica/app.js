const mail = require("../logica/mail_config")

const mailOptions = {
    from: "jorgelq99@gmail.com",
    to: "jorgelarrosaquesada@gmail.com",
    subject: "test",
    text: "test"
};

mail.sendMail(mailOptions, cb);
