import { Species } from './Species';

export interface Tree {
    id: number;
    name: string;
    species: Species;
    code: string;
    height: number;
    crownWidth: number;
    dbh: DBH;
    pictureUrl: string;
    management: string;
    socialMeaning: string;
    stress: string;
    note: string;
    latitude: number;
    longitude: number;
}
interface DBH {
    avg: number;
    sn: number;
    ew: number;
}