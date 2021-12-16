import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Use JSON file for storage
const file = join(__dirname, 'db.json');
const adapter = new JSONFile(file);
const db = new Low(adapter);

const main = async () => {
  await db.read();
  db.data = db.data || { posts: [] };             // Node >= 15.x
  db.data.posts.push('hello world');
  db.data.posts[0];
  const { posts } = db.data;
  posts.push('hello world');
  await db.write();
};

main();