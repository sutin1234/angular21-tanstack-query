import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private http = inject(HttpClient);
    private apiUrl = 'https://jsonplaceholder.typicode.com/users';

    getUsers(): Promise<User[]> {
        console.log('Fetching users...');
        return lastValueFrom(this.http.get<User[]>(this.apiUrl));
    }

    getUser(id: number): Promise<User> {
        console.log(`Fetching user with ID ${id}...`);
        return lastValueFrom(this.http.get<User>(`${this.apiUrl}/${id}`));
    }
}
