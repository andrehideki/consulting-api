import * as bcrypt from 'bcrypt';

describe("Register Consulting Test", function() {

  test("Test Comparing", async () => {
    expect(await bcrypt.compare("1234", "$2b$04$UzfaPfNyxfGVq0ma.RuCrOvCuDhuKjmQjJgLhT6ZhcE9VihFzsZ5G")).toBeTruthy();
    expect(await bcrypt.compare("4321", "$2b$04$86GW68Xys0s9XexRe4acq.KAdbuZYDHqfKe6BPWkcnXICL8PVhTaq")).toBeTruthy();
    expect(await bcrypt.compare("admin", "$2b$10$oBg7O3eWXww21N898Fbt3uVflWjLu2jb4H2mC8l78use7i1KipW/m")).toBeTruthy();
    expect(await bcrypt.compare("owner", "$2b$10$QbdimKOXFWd7gOYrSVpK5uwwkzXCe9rNWVx8atZviqPnKiXbUpkLu")).toBeTruthy();
  });

  // test("Not a test: Generate password encrypted", async () => {
  //   const salt = await bcrypt.genSalt(10);
  //   const encrypted = await bcrypt.hash('owner', salt);
  //   console.log(encrypted);
  // });

})