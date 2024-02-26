import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {Role} from "../types/role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  roles_url = environment.apiUrl;

  constructor(private http: HttpClient) { }




  fetchAllAccessRights(): Observable<any>{
    const fetchAllAccessRightsUrl = `${this.roles_url}access-rights`;

    return this.http.get<any>(fetchAllAccessRightsUrl)
  }

  activateRole(roleId): Observable<any>{
    const activateRoleUrl = `${this.roles_url}activate-role/${roleId}`;

    return this.http.put<any>(activateRoleUrl, {})
  }

  getAllActiveRoles(): Observable<any>{
    const getAllActiveRolesUrl = `${this.roles_url}active-roles`;

    return this.http.get<any>(getAllActiveRolesUrl, {})
  }

  getAllRoles(): Observable<any>{
    const getAllRolesUrl = `${this.roles_url}/fineract-provider/api/v1/roles`;

    return this.http.get<any>(getAllRolesUrl)
  }

  createRole(role : Role): Observable<any>{
    const createRoleUrl = `${this.roles_url}create-role`;

    return this.http.post<any>(createRoleUrl, role)
  }

  deactivateRole(roleId): Observable<any>{
    const deactivateRoleUrl = `${this.roles_url}deactivate-role`;

    return this.http.put<any>(deactivateRoleUrl, {id: roleId})
  }

  getAllinactiveRoles(roleId): Observable<any>{
    const getAllinactiveRolesUrl = `${this.roles_url}inactive-roles`;

    return this.http.put<any>(getAllinactiveRolesUrl, {})
  }

  updateRole(role): Observable<any>{
    const getAllinactiveRolesUrl = `${this.roles_url}update-role`;

    return this.http.put<any>(getAllinactiveRolesUrl, role)
  }

}
