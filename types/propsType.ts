interface answer {
    content: string
    data: Date
    user: string
    _id: string
}

interface User {
    username: string
    email: string
    _id: string
}


export interface Question {
    _id: string
    category: string
    answers: answer[]
    content: string
    createdDate: Date
    tags: string[]
    title: string
    user: User
    updatedDate: Date
}
