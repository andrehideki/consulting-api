import TokenGenerator from "@domain/entity/TokenGenerator";
import jwt from "jsonwebtoken";

export default class TokenGeneratorJWT implements TokenGenerator {

  constructor(private key: string,
    private expiration: string) {
  }

  generate(value: any): string {
    return jwt.sign(value, this.key, { expiresIn: this.expiration });
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