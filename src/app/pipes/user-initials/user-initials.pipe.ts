import { Pipe, PipeTransform } from '@angular/core';
import { User } from '@app/entities/user';

@Pipe({
  name: 'userInitials'
})
export class UserInitialsPipe implements PipeTransform {

  transform(user: User, ...args: unknown[]): String {
    let initials: String = ""
    
    if (user) {
      initials = user.firstName.charAt(0) + user.lastName.charAt(0);
    }

    return initials.toUpperCase();
  }

}
