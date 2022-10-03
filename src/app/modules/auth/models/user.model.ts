import { AuthModel } from './auth.model';
import { AddressModel } from './address.model';
import { SocialNetworksModel } from './social-networks.model';
import { AVATAR_DEFAULT } from 'src/app/_shared/utils/constant';

export class UserModel extends AuthModel {
  User: {
    Id: number;
    Username: string;
    Code: string;
    Password?: string;
    FullName?: string;
    Email?: string;
    Avatar?: string;
    Phone?: string;
    ForeignName?: string;
  };
  Layouts: any[] = [];
  Tenant?: {
    Code: string,
    Id: string,
    Name: string
  }

  setUser(_user: unknown) {
    const user = _user as UserModel;
    this.User.Id = user.User.Id;
    this.User.Username = user.User.Username || '';
    this.User.Password = user.User.Password || '';
    this.User.FullName = user.User.FullName || '';
    this.User.Email = user.User.Email || '';
    this.User.Avatar = user.User.Avatar || AVATAR_DEFAULT;
    this.Layouts = user.Layouts || [];
    this.Tenant = user.Tenant || {Code: '', Id: '', Name: ''};
  }
}
