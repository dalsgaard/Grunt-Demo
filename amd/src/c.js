
define(["a", "b"], function(a, b) {

  function c() {
    return a() + b() + "C";
  }

  return c;
});
