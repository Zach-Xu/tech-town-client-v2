export enum REQUEST_METHOD {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

export enum TYPE {
    REGULAR = 'REGULAR',
    BOT = 'BOT'
}

export enum VOTE_STATUS {
    CANCEL = 0,
    UP_VOTE = 1,
    DOWN_VOTE = 2
}

export enum ACTION {
    VOTE = 'VOTE',
    ANSWER = 'ANSWER',
    QUESTION = 'QUESTION'
}

export const TECH_TOWN_TOKEN: string = 'tech-town-token'