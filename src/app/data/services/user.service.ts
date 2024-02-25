import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { User } from "../../core/models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user_url = `${environment.apiUrl}/users/`;

  constructor(private http: HttpClient) {}

  getUserDetails(userId): Observable<any> {
    const getUserDetailsUrl = `${this.user_url}${userId}`;

    return this.http.get<any>(getUserDetailsUrl);
  }

  fetchAllActiveAccounts(): Observable<any> {
    const fetchAllActiveAccountsUrl = `${this.user_url}active-accounts`;

    return this.http.get<any>(fetchAllActiveAccountsUrl);
  }

  fetchAllUserAccounts(): Observable<any> {
    const fetchAllUserAccountsUrl = `${this.user_url}all-accounts`;

    return this.http.get<any>(fetchAllUserAccountsUrl);
  }

  createUserAccounts(user: User): Observable<any> {
    const createUserAccountsUrl = `${this.user_url}create-user`;

    return this.http.post<any>(createUserAccountsUrl, user);
  }

  deleteUserAccount(userId): Observable<any> {
    const deleteUserAccountUrl = `${this.user_url}delete-user/${userId}`;

    return this.http.put<any>(deleteUserAccountUrl, {});
  }

  fetchAllDeletedUserAccounts(): Observable<any> {
    const fetchAllDeletedUserAccountsUrl = `${this.user_url}deleted-accounts`;

    return this.http.get<any>(fetchAllDeletedUserAccountsUrl);
  }

  lockUserAccount(userId): Observable<any> {
    const lockUserAccountUrl = `${this.user_url}lock-user/${userId}`;

    return this.http.put<any>(lockUserAccountUrl, {});
  }

  fetchAllLockedUserAccounts(): Observable<any> {
    const fetchAllLockedUserAccountsUrl = `${this.user_url}locked-accounts`;

    return this.http.get<any>(fetchAllLockedUserAccountsUrl, {});
  }

  restoreDeletedUserAccount(email: string): Observable<any> {
    const restoreDeletedUserAccountUrl = `${this.user_url}restore-user/${email}`;

    return this.http.put<any>(restoreDeletedUserAccountUrl, {});
  }

  unlockUserAccount(email: string): Observable<any> {
    const unlockUserAccountUrl = `${this.user_url}unlock-user-account/${email}`;

    return this.http.put<any>(unlockUserAccountUrl, {});
  }

  updateUserPassword(passwordDetails): Observable<any> {
    const updateUserPasswordUrl = `${this.user_url}update-user-password`;

    return this.http.put<any>(updateUserPasswordUrl, passwordDetails);
  }

  updateUserRole(roleDetails): Observable<any> {
    const updateUserRoleUrl = `${this.user_url}update-user-role`;

    return this.http.put<any>(updateUserRoleUrl, roleDetails);
  }

  resetUserPassword(email: string): Observable<any>{
    const requestBody = { email: email };

    const url = `${this.user_url}reset-password`;
    return this.http.post(url, requestBody)
  }

  updateUser(userId, user): Observable<any> {
    const updateUserUrl = `${this.user_url}update-user/${userId}`;

    return this.http.put<any>(updateUserUrl, user);
  }

    getUserAnalytics() {
        return this.http.get<any>(`${this.user_url}analytics`);
    }

    kickOut(email) {
      const url = `${this.user_url}admin-kick-out`;
      return this.http.post(url, email)
    }

    acceptTerms(): Observable<any> {
        return this.http.post(`${this.user_url}accept-terms`, null);
    }
}
