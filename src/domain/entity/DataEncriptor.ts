export default interface DataEncriptor {
  match(source: string, target: string): Promise<boolean>;
  encrypt(data: string): Promise<string>;
  desencrypt(data: string): Promise<string>;
}