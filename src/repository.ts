import {DatabaseSync} from 'node:sqlite';
import type {User,UserRepository} from './domain.js';
export class SqliteUsers implements UserRepository {
 private db:DatabaseSync;
 constructor(path:string){this.db=new DatabaseSync(path);this.db.exec(`PRAGMA journal_mode=WAL; CREATE TABLE IF NOT EXISTS users(id TEXT PRIMARY KEY,name TEXT NOT NULL,email TEXT NOT NULL UNIQUE,createdAt TEXT NOT NULL);`)}
 all(){return this.db.prepare('SELECT * FROM users ORDER BY createdAt DESC, id').all() as unknown as User[]}
 hasEmail(email:string){return !!this.db.prepare('SELECT id FROM users WHERE email=?').get(email)}
 create(u:User){this.db.prepare('INSERT INTO users(id,name,email,createdAt) VALUES(?,?,?,?)').run(u.id,u.name,u.email,u.createdAt)}
 delete(id:string){return this.db.prepare('DELETE FROM users WHERE id=?').run(id).changes>0}
 close(){this.db.close()}
}
