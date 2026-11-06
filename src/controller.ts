import type {Request,Response} from 'express';
import {UserService} from './domain.js';
export class UserController {
 constructor(private service:Pick<UserService,'createUser'|'getAllUsers'|'deleteUser'>){}
 createUser=(req:Request,res:Response)=>{const user=this.service.createUser(req.body?.name,req.body?.email);return res.status(201).json(user)};
 getAllUsers=(_req:Request,res:Response)=>res.status(200).json(this.service.getAllUsers());
 deleteUser=(req:Request,res:Response)=>{this.service.deleteUser(String(req.params.id));return res.status(204).send()};
}
