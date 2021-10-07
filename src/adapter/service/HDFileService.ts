import { FileService } from "@domain/service/FileService";
import fs from 'fs';

export class HDFileService implements FileService{
  
  private path: string;

  constructor(path: string) {
    this.path = path;
    if (!fs.existsSync(path)) {
      fs.mkdir(path, (err) => {
        if (err) {
          throw new Error('Error creating path')
        }
      });
    }
  }

  save(name: string, content: Buffer): void {
    fs.writeFile(`${this.path}/${name}`, content, (err) => {
      if (err) throw new Error("Error Writing file");
    })
  }
}