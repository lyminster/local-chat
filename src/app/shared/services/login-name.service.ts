import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginNameService {
  readonly username = signal<string>('');

  //old method
  // private _username:string = ""

  // get username (){
  //   return this._username
  // }
  // set username(newValue:string){
  //   this._username = newValue
  // }
}
