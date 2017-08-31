import { Player } from './player.interface'

export interface Team {
    Id: number;
    PlayerList: Array<Player>;
    Name: string;
    PictureUrl: string;
}