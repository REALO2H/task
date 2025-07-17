import * as fs from 'fs';

export class PostWriter {
    createpost(csvPath: string, id: number, author: string, content: string): void {
    if (!fs.existsSync(csvPath)) {
      fs.writeFileSync(csvPath, 'ID,Author,Content\n');
    }

    const row = `${id}, ${author}, ${content.replace(/[\r\n]/g, ' ')}\n`;
    fs.appendFileSync(csvPath, row, 'utf-8');
  }
}
