import { Player } from './player.interface'

export interface Team {
    id: number;
    playerList: Array<Player>;
    name: string;
    pictureLogo: any;
}