export interface IRespPost {
    ok: boolean;
    page: number;
    posts: IPost[];
}

export interface IPost {
    imgs?: string[];
    _id?: string;
    message?: string;
    coords?: string;
    user?: IUser;
    created?: string;
}

export interface IUser {
    avatar?: string;
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
}