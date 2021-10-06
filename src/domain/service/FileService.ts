export interface FileService {
  save(name: string, content: Buffer): void;
}