import jwt from 'jsonwebtoken';

describe("JWT", function() {

  test("Test token generating", async () => {
    let token = jwt.sign({
      email: 'fulano@mail.com',
      userCategory: 'CONSULTING'
    }, 
    'CHAVE', {
      expiresIn: "1h"
    });
    
  });

  test("asdf", () => {
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImZ1bGFub0BtYWlsLmNvbSIsInVzZXJDYXRlZ29yeSI6IkNPTlNVTFRJTkciLCJpYXQiOjE2Mjg3OTQxNDEsImV4cCI6MTYyODc5Nzc0MX0.JVt_O5P-0ocSVTEOBUgAfUnz048ZLos3B1OAfvJlYbc"
  })

})