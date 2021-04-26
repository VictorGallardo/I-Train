
// Interfaces

// Respuesta de los posts
export interface IRespPost {
    ok: boolean;
    page: number;
    posts: IPost[];
}

// Respuesta de las lists
export interface IRespList {
    ok: boolean;
    page: number;
    lists: IList[];
}

// Respuesta de los items
export interface IRespItem {
    ok: boolean;
    // page: number;
    items: IItem[];
}

export interface IUser {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    avatar?: string;
}


export interface IPost {
    _id?: string;
    imgs?: string[];
    message?: string;
    coords?: string;
    user?: IUser;
    created?: string;
}



export interface IList {
    _id?: string;
    title?: string;
    completed?: boolean;
    items?: string[];
    user?: IUser;
}

export interface IItem {
    _id?: string;
    title?: string;
    description?: string;
    created?: string;
    completed?: boolean;
    preparation?: number;
    sets?: number;
    time?: number;
    restSets?: number;
    repeats?: number;
    restReps?: number;
    totalTime?: number;
    list?: IList;

}


