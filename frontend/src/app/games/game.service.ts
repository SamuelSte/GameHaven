import { Injectable } from "@angular/core";
import axios, { AxiosResponse } from 'axios';

@Injectable({
    providedIn: 'root'
})
export class GameService {

    private baseUrl = 'http://localhost:3000/';
    private gameUrl = 'http://localhost:3000/games';
    private saveUrl = 'http://localhost:3000/saves';
    private userUrl = 'http://localhost:3000/users';

    private username: string = "";

    private gameId: number | undefined;
    private stat: AxiosResponse<any, any> | undefined;
    private save: AxiosResponse<any, any> | undefined;

    constructor() {}

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
    
    getStat(): AxiosResponse<any, any> | undefined {
        return this.stat;
    }

    getSave(): AxiosResponse<any,any> | undefined {
        return this.save;
    }

    getBoard(): number[][] {
        if (this.save) {
            const data: {data: Record<string, any>} = this.save.data.data;
            const board = data.data["board"];
            return this.convertJsonToArray(board);
        } else {
            return [];
        }
    }

    getStatus(): number[][] {
        if (this.save) {
            const data: {data: Record<string, any>} = this.save.data.data;
            const status = data.data["status"];
            return this.convertJsonToArray(status);
        } else {
            return [];
        }
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

    async createSave(statId: number, data: {data: Record<string, any>}) {
        if (!this.save?.data) {
            this.setAxios();

            const payload = {
                data: data
            }

            try {
                await axios.post(`${this.saveUrl}/${statId}`, payload);
            } catch (error: any) {
                console.error("Fehler:", error.message);
            }
        }
    }

    async createStat(game: string, difficulty: string) {
        if (!this.stat?.data) {
            this.setAxios();

            const payload = {
                difficulty: difficulty
            }

            try {
                await axios.post(`${this.baseUrl}stats/${await this.getGameId(game)}`, payload);
            } catch (error: any) {
                console.error("Fehler:", error.message);
            }
        }
    }

    async updateStat(game: string, difficulty: string, win: boolean) {
        if (this.stat) {
            console.log("difficulty", difficulty);
            this.setAxios();

            const gamesPlayed = this.stat.data.gamesPlayed + 1;
            const gamesWon = win ? this.stat.data.gamesWon + 1 : this.stat.data.gamesWon; 

            const payload = {
                gamesPlayed: gamesPlayed,
                gamesWon: gamesWon
            }

            try {
                await axios.patch(`${this.baseUrl}stats/${await this.getGameId(game)}/${difficulty}`, payload);

                const gameId = await this.getGameId(game);
                const statUrl = `${this.baseUrl}stats/${gameId}/${difficulty}`;
                this.stat = await axios.get(statUrl);
            } catch (error: any) {
                console.error("Fehler beim Updaten:", error.message);
            }
        }
    }

    async updateSave(statId: number, data: {data: Record<string, any>}) {
        if (this.save?.data) {
            this.setAxios();

            const payload = {
                data: data
            };

            try {
                await axios.patch(`${this.saveUrl}/${statId}`, payload);
            } catch (error: any) {
                console.error("Fehler beim Updaten:", error.message);
            }
        }
    }

    convertArrayToJson(data: any[][]) {
        if (data.length === 0) return [];
    
        const keys = data[0].map((_, index) => index.toString());
    
        return data.map(row => {
            const obj: { [key: string]: any } = {};
            row.forEach((value, index) => {
                obj[keys[index]] = value;
            });
            return obj;
        });
    }

    convertJsonToArray(json: { [key: string]: number }[]): number[][] {
        if (json.length === 0) return [];
    
        const keys = Object.keys(json[0]).map(Number).sort((a, b) => a - b);
        return json.map(obj => keys.map(key => obj[key.toString()] ?? 0));
    }

    async load(game: string, difficulty: string) {
        this.setAxios();

        this.stat = undefined;
        this.save = undefined;
        this.gameId = undefined;

        const gameId = await this.getGameId(game);
        const statUrl = `${this.baseUrl}stats/${gameId}/${difficulty}`;
        this.stat = await axios.get(statUrl);

        if (this.stat?.data) {
            const statId = this.stat.data.id;
            const saveUrl = `${this.saveUrl}/${statId}`;
            this.save = await axios.get(saveUrl);
        }
    }

    async getGameId(game: string) {
        if (!this.gameId) {
            this.gameId = (await axios.get(`${this.gameUrl}/${game}`)).data.id;
        }
        return this.gameId;
    }
    
    
    isLoggedIn(): boolean {
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
            let isLogged = false;
    
            document.cookie.split(';').forEach((cookie) => {
                const [name] = cookie.trim().split('=');
                if (name === 'jwt') {
                    isLogged = true;
                }
            });
    
            return isLogged;
        }
    
        return false;
    }

}