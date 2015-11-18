"use strict";

var
    assert = require("chai").assert,
    spec = require("api-first-spec"),
    config = require("./config/config.json");

var API = spec.define({
    "endpoint": "/api/followers/:userId",
    "method": "GET",
    "request": {
        "contentType": spec.ContentType.URLENCODED,
        "params": {
            "userId": "int"
        },
        "rules": {
            "userId": {
                "required": true
            }
        }
    },
    "response": {
        "strict": true,
        "contentType": spec.ContentType.JSON,
        "data": {
            "code": "int",
            "result": "boolean",
            "count": "int",
            "users": [{
                "name": "string",
                "id": "int"
            }]
        },
        "rules": {
            "code": {
                "required": true
            },
            "result": {
                "required": true
            },
            "users": {
                "required": true
            }
        }
    }
});

describe("show", function () {
    var host = spec.host(config.host);

    it("Invalid userId", function (done) {
        host.api(API).params({
            "userId": 7
        }).badRequest(function (data, res) {
            assert.equal(data.code, 400);
            assert.equal(data.result, false);
            done();
        });
    });

    it("success", function (done) {
        host.api(API).params({
            "userId": 1
        }).success(function (data, res) {
            assert.equal(data.code, 200);
            assert.equal(data.result, true);
            assert.equal(data.count, 5);
            assert.equal(data.users[0].name, "Taro Yamada");
            done();
        });
    });

});

module.exports = API;