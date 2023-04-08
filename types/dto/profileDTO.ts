import { SkillVO } from "../vo/profileVO"

export interface ProfileDTO {
    bio: string | undefined
    username?: string
    github: string | undefined
    skills: SkillVO[]
}