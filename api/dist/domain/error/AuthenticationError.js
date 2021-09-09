"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
class AuthenticationError extends Error {
    constructor(message) {
        super(message);
    }
}
exports.AuthenticationError = AuthenticationError;
