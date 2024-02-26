import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../core/models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user_url = `${environment.apiUrl}`;


  constructor(private http: HttpClient) {}

  fetchAllUserAccounts(): Observable<any> {
 
    const fetchAllUserAccountsUrl = `${this.user_url}/fineract-provider/api/v1/users`;

    return this.http.get<any>(fetchAllUserAccountsUrl);
  }

  createUserAccounts(user: any): Observable<any> {
    const createUserAccountsUrl = `${this.user_url}/fineract-provider/api/v1/users/withImage'`;

    return this.http.post<any>(createUserAccountsUrl, user);
  }

  updateUser(userId, user): Observable<any> {
    const updateUserUrl = `${this.user_url}/fineract-provider/api/v1/users/${userId}`;

    return this.http.put<any>(updateUserUrl, user);
  }

  deleteUserAccount(userId): Observable<any> {
    const deleteUserAccountUrl = `${this.user_url}/fineract-provider/api/v1/users/4${userId}`;

    return this.http.put<any>(deleteUserAccountUrl, {});
  }

  getUserDetails(userId): Observable<any> {
    const getUserDetailsUrl = `${this.user_url}/fineract-provider/api/v1/users/${userId}`;

    return this.http.get<any>(getUserDetailsUrl);
  }

}
