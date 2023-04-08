export interface ProfileVO extends ProfileTabVO {
    joinTime: string
    userId: number
    username: string
    isFollowed: string
    github: string
}

export interface SkillVO {
    skillName: string
    description: string | null
    id?: number
}

export interface ProfileTabVO {
    following: number
    followers: number
    questions: number
    answers: number
    bio: string
    skills: SkillVO[]
}

export interface ProfileEntity {
    id: number
    createdTime: string
    updatedTime: string
    bio: string
    github: string
    skills: SkillVO[]
}

export interface GitHubRepo {
    id: number
    html_url: string
    name: string
    stargazers_count: number
    watchers_count: number
    forks_count: number
    description: string
    language: string
}