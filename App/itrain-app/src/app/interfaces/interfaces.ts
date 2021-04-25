
// Interfaces

export interface IRespPost {
    ok: boolean;
    page: number;
    posts: IPost[];
}

export interface IRespList {
    ok: boolean;
    page: number;
    lists: IList[];
}

export interface IRespItem {
    ok: boolean;
    page: number;
    items: IItem[];
}

export interface IUser {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
}


export interface IList {
    _id?: string;
    title?: string;
    completed?: boolean;
    items?: string[];
    user?: string;
}

export interface IItem {
    _id?: string;
    title?: string;
    description?: string;
    created?: Date;
    completed?: boolean;
    preparation?: number;
    sets?: number;
    time?: number;
    restSets?: number;
    repeats?: number;
    restReps?: number;
    totalTime?: number;
    list?: string;

}



export interface IPost {
    _id?: string;
    imgs?: string[];
    message?: string;
    coords?: string;
    user?: IUser;
    created?: string;
}


