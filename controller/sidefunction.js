//function to get new index
let data = require("../database/user.json");
function newIndex() {
    let nIndex = 0;
    data.forEach((i) => {
        if (nIndex < i.id) {
            nIndex = i.id;
        }
    });
    return nIndex + 1;
}
module.exports = { newIndex };