"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TokenGeneratorJWT {
    constructor(key, expiration) {
        this.key = key;
        this.expiration = expiration;
    }
    generate(value) {
        return jsonwebtoken_1.default.sign(value, this.key, { expiresIn: this.expiration });
    }
    decode(token) {
        try {
            jsonwebtoken_1.default.verify(token, this.key);
            const decodedToken = jsonwebtoken_1.default.decode(token);
            return decodedToken;
        }
        catch (e) {
            throw new Error("Invalid token");
        }
    }
}
exports.default = TokenGeneratorJWT;
