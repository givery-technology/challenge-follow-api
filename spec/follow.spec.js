"use strict";

var
    assert = require("chai").assert,
    spec = require("api-first-spec"),
    config = require("./config/config.json");

var API = spec.define({
    "endpoint": "/api/followers/",
    "method": "POST",
    "request": {
        "contentType": spec.ContentType.URLENCODED,
        "params": {
            "userId": "int",
            "followId": "int"
        },
        "rules": {
            "userId": {
                "required": true
            },
            "followId": {
                "required": true
            }
        }
    },
    "response": {
        "strict": true,
        "contentType": spec.ContentType.JSON,
        "data": {
            "code": "int",
            "result": "boolean"
        },
        "rules": {
            "code": {
                "required": true
            },
            "result": {
                "required": true
            }
        }
    }
});

describe("follow", function () {
    var host = spec.host(config.host);

    it("Already a follower", function (done) {
        host.api(API).params({
            "userId": 1,
            "followId": 2
        }).badRequest(function (data, res) {
            assert.equal(data.code, 400);
            assert.equal(data.result, false);
            done();
        });
    });

    it("Invalid userId", function (done) {
        host.api(API).params({
            "userId": 7,
            "followId": 2
        }).badRequest(function (data, res) {
            assert.equal(data.code, 400);
            assert.equal(data.result, false);
            done();
        });
    });

    it("Invalid followId", function (done) {
        host.api(API).params({
            "userId": 2,
            "followId": 7
        }).badRequest(function (data, res) {
            assert.equal(data.code, 400);
            assert.equal(data.result, false);
            done();
        });
    });

    it("success", function (done) {
        host.api(API).params({
            "userId": 4,
            "followId": 5
        }).success(function (data, res) {
            assert.equal(data.code, 200);
            assert.equal(data.result, true);
            done();
        });
    });

});

module.exports = API;