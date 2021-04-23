
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

export interface IUser {
    avatar?: string;
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
}


export interface IList {
    title?: string;
    completed?: boolean;
    items?: string[];
    user?: string;
}

export interface IPost {
    imgs?: string[];
    _id?: string;
    message?: string;
    coords?: string;
    user?: IUser;
    created?: string;
}


