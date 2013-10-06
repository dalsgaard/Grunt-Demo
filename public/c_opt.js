define("a", [], function() {
    function e() {
        return "A";
    }
    return e;
}), define("b", [], function() {
    function e() {
        return "B";
    }
    return e;
}), define("c", [ "a", "b" ], function(e, t) {
    function n() {
        return e() + t() + "C";
    }
    return n;
});;