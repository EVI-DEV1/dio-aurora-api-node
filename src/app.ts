import express from 'express';
import {fileURLToPath} from 'node:url';
import {UserService,ApiError,type UserRepository} from './domain.js';
import {UserController} from './controller.js';
export function createApp(repository:UserRepository){
 const app=express();app.disable('x-powered-by');
 app.use((_req,res,next)=>{res.set({'X-Content-Type-Options':'nosniff','Referrer-Policy':'same-origin','Content-Security-Policy':"default-src 'self'; style-src 'self'; script-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"});next()});
 app.use(express.json({limit:'16kb'}));
 const c=new UserController(new UserService(repository));const routes=express.Router();
 routes.get('/users',c.getAllUsers);routes.post('/users',c.createUser);routes.delete('/users/:id',c.deleteUser);
 routes.get('/health',(_req,res)=>res.json({status:'ok',mode:'demo'}));app.use('/api',routes);
 app.use('/api',(_req,res)=>res.status(404).json({message:'Rota não encontrada.'}));
 app.use(express.static(fileURLToPath(new URL('../public',import.meta.url))));
 app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{if(err instanceof ApiError)return res.status(err.status).json({message:err.message});if(err instanceof SyntaxError)return res.status(400).json({message:'JSON inválido.'});if((err as {status?:number})?.status===413)return res.status(413).json({message:'Dados excedem o limite permitido.'});console.error('Falha interna na API');return res.status(500).json({message:'Não foi possível concluir a operação.'})});return app;
}
