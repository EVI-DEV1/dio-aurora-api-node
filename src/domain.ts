export interface User {id:string;name:string;email:string;createdAt:string}
export interface UserRepository { all():User[]; create(user:User):void; delete(id:string):boolean; hasEmail(email:string):boolean }
export class ApiError extends Error {constructor(public status:number,message:string){super(message)}}
export class UserService {
 constructor(private repository:UserRepository){}
 getAllUsers(){return this.repository.all()}
 createUser(name:unknown,email:unknown):User {
  if(typeof name!=='string'||name.trim().length<2||name.trim().length>100)throw new ApiError(400,'Informe um nome entre 2 e 100 caracteres.');
  if(typeof email!=='string'||email.length>254||!/^\S+@[^\s@]+\.[^\s@]+$/.test(email.trim()))throw new ApiError(400,'Informe um e-mail válido.');
  const normalized=email.trim().toLowerCase();
  if(this.repository.hasEmail(normalized))throw new ApiError(409,'Este e-mail já está cadastrado.');
  const user={id:crypto.randomUUID(),name:name.trim(),email:normalized,createdAt:new Date().toISOString()};
  this.repository.create(user);return user;
 }
 deleteUser(id:string){if(!/^[\da-f-]{36}$/i.test(id))throw new ApiError(400,'Identificador inválido.');if(!this.repository.delete(id))throw new ApiError(404,'Cliente não encontrado.');}
}
