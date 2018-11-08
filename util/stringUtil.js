const http = require('http');

function get_json(url, callback) {
    http.get(url, function (res) {
        var body = '';
        res.on('data', function (chunk) {
            body += chunk;
        });

        res.on('end', function () {
            var response = JSON.parse(body);
            callback(response);
        });
    });
}

String.prototype.revr = function () {
    return this.split("").reverse().join("");
};

String.prototype.toBs = function () {
    return Buffer.from(this).toString('base64');
};
String.prototype.fBs = function () {
    return Buffer.from(this, 'base64').toString();
};

String.prototype.hasElementOf = function (array) {
    var result = false;
    array.every(elem => {
        if (this.indexOf(elem) >= 0) {
            result = true;
            return false;
        } else {
            return true;
        }
    });
    return result;
};


module.exports.get_json = get_json;
module.exports.String = String;