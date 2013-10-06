define("d", [], function() {
    function e() {
        return "D";
    }
    return e;
}), define("e", [ "d" ], function(e) {
    function t() {
        return e() + "E";
    }
    return t;
});;