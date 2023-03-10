const express = require("express"); 
const app = express(); 
app.use(express.json());
require("dotenv").config();
const port = process.env.PORT || 5000;
app.use("/user", require("./routers/user"));
app.use("/profile", require("./routers/profile"));

 
app.listen(port, () => {
    console.log(` port is running at ${port} ... `);
});  