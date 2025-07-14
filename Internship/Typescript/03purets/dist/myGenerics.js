"use strict";
const score = [];
const names = [];
function identityOne(val) {
    return val;
}
function identityTwo(val) {
    return val;
}
function identityThree(val) {
    return val;
}
identityThree("Ian");
identityThree(23);
identityThree(true);
function identityFour(val) {
    return val;
}
identityFour({
    brand: "Coca Cola",
    type: "Soda",
    capacity: 500
});
