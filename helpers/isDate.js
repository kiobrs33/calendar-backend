const moment = require("moment");

const isDate = (dateValue)  => {
    if(!dateValue){
        return false;
    }

    const fecha = moment(dateValue);

    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isDate }