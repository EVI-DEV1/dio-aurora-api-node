import {mkdirSync} from 'node:fs';
import {createApp} from './app.js';
import {SqliteUsers} from './repository.js';
mkdirSync('data',{recursive:true});
const repository=new SqliteUsers(process.env.DATABASE_PATH??'data/aurora.sqlite');
const server=createApp(repository).listen(Number(process.env.PORT??5180),process.env.HOST??'127.0.0.1',()=>console.log('Aurora API disponível em http://127.0.0.1:5180'));
function shutdown(){server.close(()=>{repository.close();process.exit(0)})}process.on('SIGINT',shutdown);process.on('SIGTERM',shutdown);
