import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class KyudokuCommunication {

    private gameUrl = 'http:/localhost:3000/games/kyudoku';
    private saveUrl = 'http:/localhost:3000/game_specific_stats';

    constructor(private http: HttpClient) {}

    createSave(statId: number, data: {data: Record<string, any>}) {
        this.http.post
    }

    getSaveIdByName(name: string) {

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

    load(game: string, difficulty: string) {

    }

    update(field: number[][], statusField: number[][]) {
        
    }

}