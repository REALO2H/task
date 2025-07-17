import * as fs from 'fs';



export class PostViewer {
viewPost (csvPath: string): void {
    const data = fs.readFileSync(csvPath, 'utf-8').trim();
    const lines = data.split('\n').slice(1); // skip header
    if (lines.length === 0) {
      console.log("No posts to show.");
      return;
    }
    console.log("\n==== All Posts ====");
    lines.forEach(line => {
      const [id, author, content] = line.split(',');
      console.log(`Post ID: ${id}, Author: ${author}, Content: ${content}`);
    });
    console.log("===================");

  }
}



