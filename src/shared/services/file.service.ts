import { Injectable } from '@nestjs/common';
import * as fileSystem from 'fs';
import { join } from 'path';

/**
 * File service for saving file on server
 * @author Serdar Durdyev
 */
@Injectable()
export class FileService {

  /**
   * Save file in the directory
   * @param directory Directory for save
   * @param file File for save
   */
  public async saveFile(directory: string, file: any): Promise<void> {
    const pathForSave = join(process.cwd(), directory);
    const filestream = fileSystem.createWriteStream(pathForSave);
    filestream.write(Buffer.from(file.buffer));
    filestream.end();
  }

  /**
   * Delete file from path
   * @param path Path for delete file
   */
  public async deleteFile(path: string) {
    const pathForDelete = 'src/' + path;
    await fileSystem.unlink(pathForDelete, (error) => {
    });
  }

  /**
   * Generate unqiue filename
   * @param fileName Filename for generation
   */
  public generateFileName(fileName: string): string {
    const lastIndexOfExtension = fileName.lastIndexOf('.');
    const nameFile = fileName.substr(0, lastIndexOfExtension) + '_' + Date.now();
    const extension = fileName.substr(lastIndexOfExtension + 1, fileName.length + 1);
    return nameFile + '.' + extension;
  }
}