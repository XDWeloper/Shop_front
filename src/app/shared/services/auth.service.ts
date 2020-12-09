import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { tap }  from 'rxjs/operators'
import {computeStartOfLinePositions} from '@angular/compiler-cli/src/ngtsc/sourcemaps/src/source_file';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  login(user){
   //return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.API_KEY}`, User)
   return this.http.post(`${environment.BASE_URL}${environment.AUTH_URL}`, user)
   .pipe(
     tap(this.setToken)
   )
  }

  private setToken(response){
    if(response) {
      console.log(response)
      const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
      localStorage.setItem('fb-token-exp', expData.toString())
      localStorage.setItem('fb-token', response.idToken)
    } else {
      localStorage.clear()
    }
  }

  getToken(){
    const expDate = new Date(localStorage.getItem('fb-token-exp'))
    if(new Date > expDate){
      return null
    }
    return localStorage.getItem('fb-token')
  }

  logout(){
    this.setToken(null)
  }

  isAuthentificated(){
    return !!this.getToken()
  }
}
