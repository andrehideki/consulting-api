export default interface TokenGenerator {
  generate(value: any): string;
  decode(token: any): any;
}