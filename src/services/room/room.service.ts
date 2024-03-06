// photo.service.ts
import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class RoomService {
  async savePhotosToServer(files) {
    // Обработка и сохранение загруженных файлов
    for (const file of files) {
        console.log(typeof file.filename);
        
      const filePath = path.join('./uploads', String());
      fs.writeFileSync(filePath, file.buffer);
    }
  }
}