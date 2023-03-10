
let userToken = require("../database/token.json");
let data = require("../database/user.json");

const fs = require("fs");
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;


let restData = (id) => data.filter((i) => i.id != id);
let userData = (id) => data.find((i) => i.id == id);
let roleData = (role) => data.filter((i) => i.role != role);
 
function dataPush(data) {
    fs.writeFileSync("./database/user.json", JSON.stringify(data), "utf-8");
}


const { authenticateTokenError, passwordError, invalidData, permissionGrant ,permissionError } = require("../utils/messages");

let checkUser = (token) => {
    if (userToken.token === token) {
        return true;
    }
    else {
        return false;
    }
};

const profileUpdate = (req, res) => {
    if (checkUser(req.headers.token)){
        const token = jwt.verify(userToken.token, secret);
        const id = token.data.id;
        let dataOfUser = userData(id);
        let restOfData = restData(id);
        if (req.body.name) {
            dataOfUser.name = req.body.name;
        }
        if (req.body.password) {
            dataOfUser.password = req.body.password;
        }
        if (req.body.age) {
            dataOfUser.age = req.body.age;
        }
        restOfData.push(dataOfUser);
        dataPush(restOfData);
        res.send(dataOfUser); 
    }
    else {
        res.status(400).send(authenticateTokenError);
    }
}; 

const resetPass = (req, res) => {
    if (checkUser(req.headers.token)) 
    {
        const token = jwt.verify(userToken.token, secret);
        const id = token.data.id;
        let dataOfUser = userData(id);
        let restOfData = restData(id);
        if (req.body.password == dataOfUser.password) 
        {
            dataOfUser.password = req.body.newPassword;
            restOfData.push(dataOfUser);
            dataPush(restOfData);
            res.send(dataOfUser);

        }
        else 
        {
            res.status(400).send(passwordError);
        }

    }
    else 
    {
        res.status(400).send(authenticateTokenError);
    }
};

const getUsers = (req, res) => {
    if (checkUser(req.headers.token)) 
    {
        const token = jwt.verify(userToken.token, secret);
        const id = token.data.id;
        const dataOfUser = userData(id);
        if (dataOfUser.role == "super") 
        {
            const requiredData = roleData(dataOfUser.role);
            res.send(requiredData);
        }
        else if (dataOfUser.role == "admin" && dataOfUser.permission.includes("get") ) 
        {
            const requiredData = roleData("user");
            res.send(requiredData);
        }
        else if (dataOfUser.role == "user"  ) 
        {
            res.send(dataOfUser);
        }
        else 
        {
            res.status(400).send("can't get data");
        }


    }
    else 
    {
        res.status(400).send(authenticateTokenError);
    }

};

const updateUser = (req, res) => {
    if (checkUser(req.headers.token)) {
        const token = jwt.verify(userToken.token, secret);
        const id = token.data.id;
        const dataOfUser = userData(id);
        if (dataOfUser.role == "super") 
        {
            const requiredData = userData(req.params.id);
            console.log(requiredData.role,"--");
            if (!requiredData || requiredData.role == "super") 
            {
                res.status(404).send(invalidData);
            }
            else {
                let restOfData = restData(req.params.id);
                if (req.body.name) 
                {
                    requiredData.name = req.body.name;
                }
                if (req.body.password) 
                {
                    requiredData.password = req.body.password;
                }
                if (req.body.age) 
                {
                    requiredData.age = req.body.age;
                }
                restOfData.push(requiredData);
                dataPush(restOfData);
                res.send(requiredData); 
            }
        }
        else if (dataOfUser.role == "admin" && dataOfUser.permission.includes("update")) 
        {
            const requiredData = userData(req.params.id);
            if (!requiredData || requiredData.role == "super" || requiredData.role == "admin") 
            {
                res.status(404).send(invalidData);
            }
            else 
            {
                let restOfData = restData(req.params.id);
                if (req.body.name) {
                    requiredData.name = req.body.name;
                }
                if (req.body.password) {
                    requiredData.password = req.body.password;
                }
                if (req.body.age) {
                    requiredData.age = req.body.age;
                }
                restOfData.push(requiredData);
                dataPush(restOfData);
                res.send(requiredData);
            }
        }
        
        else {
            res.status(400).send("can't update data");
        }


    }
    else {
        res.status(400).send(authenticateTokenError);
    }
};

const deleteUser = (req, res) => {
    if (checkUser(req.headers.token)) {
        const token = jwt.verify(userToken.token, secret);
        const id = token.data.id;
        const dataOfUser = userData(id);
        const requiredData = userData(req.params.id);
        if (dataOfUser.role == "super" && requiredData.role!="super") {
            let restOfData = restData(req.params.id);
            dataPush(restOfData);
            res.send(restOfData);
            
        }
        else if (dataOfUser.role == "admin" &&   dataOfUser.permission.includes("delete") &&requiredData.role=="user") {
            let restOfData = restData(req.params.id);
            dataPush(restOfData);
            res.send(restOfData);
        }
        else {
            res.send(permissionError);
        }
    }
    else {
        res.status(400).send(authenticateTokenError);
    }

};
const permitUser = (req, res) => {
    if (checkUser(req.headers.token)) {
        const token = jwt.verify(userToken.token, secret);
        const id = token.data.id;
        const dataOfUser = userData(id);
        let restOfData = restData(id);
        let requiredData = userData(req.params.id);
        if (!requiredData || requiredData.role != "admin" || dataOfUser.role!="super" )  {
            res.status(400).send(invalidData);
        }
        
        else {
            if ( requiredData.permission.includes(req.body.permission)) {
                res.send("already have permission");
            }
            else {
                requiredData.permission.push(req.body.permission);
                restOfData.push(requiredData);
                dataPush(restOfData);
                res.send(permissionGrant);
            }
        }
    }
    else {
        res.status(400).send(authenticateTokenError);
    }

};

module.exports = { profileUpdate, resetPass, getUsers, updateUser, deleteUser, permitUser }; 