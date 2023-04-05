export interface ProfileVO extends ProfileTabVO {
    joinTime: string
    userId: number
    username: string
    isFollowed: string

}

export interface SkillVO {
    skillName: string
    description: string
}

export interface ProfileTabVO {
    following: number
    followers: number
    questions: number
    answers: number
    bio: string
    skills: SkillVO[]
}