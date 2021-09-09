
describe("Register Consulting Test", function() {

  const bcrypt = require("bcrypt");

  test("Test Comparing", async () => {
    expect(await bcrypt.compare("1234", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G")).toBeTruthy();
    expect(await bcrypt.compare("4321", "$2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq")).toBeTruthy();
  });

})