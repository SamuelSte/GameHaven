import { Injectable } from "@angular/core";
import { ProfileComponent } from "./profile/profile.component";
import axios from 'axios';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from "@angular/router";


@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    
    private userUrl = 'http://localhost:3000/users';
    private popUp: MatDialogRef<ProfileComponent, any> | undefined;
    
    private username: string = "";

    constructor(private dialog: MatDialog, private router: Router) {}

    async openPopUp() {

        const topOffset = window.innerHeight * 0.1 + 16;
        const rightOffset = 16;

        this.popUp = this.dialog.open(ProfileComponent, {
            width: '400px',
            height: '600px',
            position: {
                top: `${topOffset}px`,
                right: `${rightOffset}px`
            },
            
        });

        this.popUp.afterClosed().subscribe(_ => {

        });
        
    }

   async loadUsername() {
        try {
            this.setAxios();
            
            const response = await axios.get(this.userUrl);

            this.username = response.data.username;
        } catch (error) {
            this.username = '';
        }
    }

    getUsername(): string {
        return this.username;
    }


    async logout() {
        this.popUp?.close();
        document.cookie = 'jwt=; Max-Age=0; path=/; sameSite=Strict; domain=localhost';
        axios.defaults.headers.common['Authorization'] = undefined;
        await this.loadUsername();
        this.router.navigate(['']);
    }

    toLoginPage() {
        this.popUp?.close();
        this.router.navigate(['/auth/login']);
    }
    
    setAxios() {
        axios.defaults.withCredentials = true;
        if (typeof document !== 'undefined') {
            document.cookie.split(';').forEach((cookie) => {
                const [name, value] = cookie.trim().split('=');
                if (name === 'jwt') {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${value}`;
                }
            });
        }
    }


}