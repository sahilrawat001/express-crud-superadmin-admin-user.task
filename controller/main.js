let data = require("../database/user.json");

const fs = require("fs");
const jwt = require("jsonwebtoken");
// require("dotenv")
const { newIndex } = require("./sidefunction");
const { SignInError, invalidData } = require("../utils/messages");
const secret = process.env.SECRET;


function tokenPush(data) {
    fs.writeFileSync("./database/token.json", JSON.stringify(data), "utf-8");
}

function dataPush(data) {
    fs.writeFileSync("./database/user.json", JSON.stringify(data), "utf-8");
}




let userMail = (mail) => data.find((i) => i.mail == mail);
let userPassword = (password) => data.find((i) => i.password == password);






const signUp = (req, res) => {
    //gets object from id
    let checkEmail = userMail(req.body.mail);

    if (checkEmail) {
        res.status(400).send(" user already existed");
    } else {
        //assigning index to new user
        req.body.id = newIndex();
        console.log(req.body.id);
        data.push(req.body);
        let token = jwt.sign({ data: req.body }, secret, { expiresIn: "1h" });
        let obj = new Object;
        obj.token = token;
        tokenPush(obj)
        // fspush(data);
        dataPush(data);
        res.status(200).send({ token });
        
    }
};

const signIn = (req, res) => {
    let checkEmail = userMail(req.body.mail);
    let checkPassword = userPassword(req.body.password);

    if (!checkEmail || !checkPassword) {
        res.status(400).send(SignInError);
    } else {
        if (checkEmail.id != checkPassword.id) {
            console.log( invalidData);
            res.status(404).send( invalidData);
        }

        else {

            let token = jwt.sign({ data: checkEmail }, secret, { expiresIn: "3h" });
            console.log(" ok");
            let obj = new Object;
            obj.token = token;
            console.log(obj);
            tokenPush(obj);
            res.status(200).send(JSON.stringify({ token }));
        }

    }
};



module.exports = { signUp, signIn };
