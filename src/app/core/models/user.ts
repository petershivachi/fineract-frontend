import {Role} from "../../admin/roles/data/types/role";

export class User {
  creationDate?: Date;
  firstLogin?: Boolean;
  hasAcceptedTerms?: Boolean;
  deletedDate?: Date;
  email?: string;
  firstName?: string;
  id?: number;
  isLoggedIn?: number;
  lastName?: string;
  password?: string;
  resetPasswordToken?: string;
  resetPasswordTokenExpire?: Date;
  roles?: Role[];
  token?:string;
  img?: string;
  phoneNumber?:string;
}
