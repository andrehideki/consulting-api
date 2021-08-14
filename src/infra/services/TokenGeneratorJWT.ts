import TokenGenerator from "@domain/entity/TokenGenerator";
import jwt from "jsonwebtoken";

export default class TokenGeneratorJWT implements TokenGenerator {

  constructor(private key: string) {
  }

  generate(value: any): string {
    // return jwt.sign(value, this.key, { expiresIn: "1h" });
    return jwt.sign(value, this.key, { expiresIn: "10s" });
  }
  
  decode(token: any): any {
    try {
      jwt.verify(token, this.key);
      const decodedToken = jwt.decode(token);
      return decodedToken;
    } catch (e) {
      throw new Error("Invalid token");
    }
  }
}