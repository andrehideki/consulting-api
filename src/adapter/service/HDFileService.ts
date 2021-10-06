import { FileService } from "@domain/service/FileService";
import fs from 'fs';

export class HDFileService implements FileService{
 
  save(name: string, content: Buffer): void {
    fs.writeFile(name, content, (err) => {
      if (err) throw new Error("Error Writing file");
    })
  }
}