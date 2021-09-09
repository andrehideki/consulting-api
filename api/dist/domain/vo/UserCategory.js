"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserCategory = exports.UserCategory = void 0;
var UserCategory;
(function (UserCategory) {
    UserCategory["ADMIN"] = "ADMIN";
    UserCategory["OWNER"] = "OWNER";
    UserCategory["CONSULTING"] = "CONSULTING";
})(UserCategory = exports.UserCategory || (exports.UserCategory = {}));
const getUserCategory = (category) => {
    let userCategory = UserCategory[category];
    if (!userCategory)
        throw new Error("Category not found");
    return userCategory;
};
exports.getUserCategory = getUserCategory;
