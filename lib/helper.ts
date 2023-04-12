import { InboxVO, Participant } from "../types/vo/inboxVO"
import { MessageVO } from "../types/vo/messageVO"
import { ACTION, TYPE } from "./constants"

export const getTimeSince = (createdTimeString: string): string => {
    let createdTime = new Date(createdTimeString)
    const createTimeInMils = createdTime.getTime()
    if (createdTime === null) {
        return ''
    }
    let now = new Date().getTime()
    let second = Math.floor((now - createTimeInMils) / (1000))
    let minute = Math.floor(second / 60)
    let hour = Math.floor(minute / 60)
    let day = Math.floor(hour / 24)
    let month = Math.floor(day / 31)
    let year = Math.floor(month / 12)

    if (year > 0) {
        if (year === 1) {
            return '1 year'
        }
        return year + ' years'
    } else if (month > 0) {
        if (month === 1) {
            return '1 month'
        }
        return month + ' months'
    } else if (day > 0) {
        if (day === 1) {
            return '1 day'
        }
        let ret = day + ' days'
        if (day >= 7 && day < 14) {
            ret = '1 week'
        } else if (day >= 14 && day < 21) {
            ret = '2 weeks'
        } else if (day >= 21 && day < 28) {
            ret = '3 weeks'
        } else if (day >= 28 && day < 31) {
            ret = '4 weeks'
        }
        return ret
    } else if (hour > 0) {
        if (hour === 1) {
            return '1 hour'
        }
        return hour + ' hours'
    } else if (minute > 0) {
        if (minute === 1) {
            return '1 min'
        }
        return minute + ' mins'
    } else if (second > 0) {
        if (second === 1) {
            return '1 sec'
        }
        return second + ' secs'
    } else {
        return 'just now'
    }
}

export const sortInboxList = (inboxList: InboxVO[]): InboxVO[] => {
    const botInbox = inboxList.find((inbox) => inbox.type === TYPE.BOT)
    const regularInboxes = inboxList.filter((inbox) => inbox.type === TYPE.REGULAR)


    const sortedRegularInboxes = regularInboxes.sort((a, b) => {

        const aLastMessageTime = new Date(a.updatedTime).getTime()
        const bLastMessageTime = new Date(b.updatedTime).getTime()
        return bLastMessageTime - aLastMessageTime
    })

    if (botInbox) {
        return [botInbox, ...sortedRegularInboxes]
    }
    return sortedRegularInboxes
}

export const sortMessages = (messages: MessageVO[]): MessageVO[] => {
    return messages.sort((a, b) => {
        const aCreatedTime = new Date(a.createdTime!).getTime()
        const bCreatedTime = new Date(b.createdTime!).getTime()
        return aCreatedTime - bCreatedTime
    })

}

export const getUsername = (loggedUserId: number, user1: Participant, user2: Participant): string => {
    return user1.id === loggedUserId ? user2.username : user1.username
}

export const getUserId = (loggedUserId: number | undefined, user1: Participant | undefined, user2: Participant | undefined): number => {
    if (!loggedUserId || !user1 || !user2) {
        return -1
    }
    return user1.id === loggedUserId ? user2.id : user1.id
}

export const getUser = (loggedUserId: number | undefined, user1: Participant | undefined, user2: Participant | undefined): Participant | undefined => {
    if (!loggedUserId || !user1 || !user2) {
        return undefined
    }
    return user1.id === loggedUserId ? user2 : user1
}

export const getGitHubUsername = (githubLink: string): string | null => {

    // Regular expression to extract the username from a GitHub user link
    const regex = /^https?:\/\/github\.com\/([a-zA-Z\d](?:[a-zA-Z\d]|-(?=[a-zA-Z\d])){0,38})\/?$/

    const matches = githubLink.match(regex)

    if (matches && matches.length > 1) {
        return matches[1]
    } else {
        return null
    }
}

export const getActivityAction = (action: string): string => {
    switch (action) {
        case ACTION.VOTE:
            return 'up-voted'
        case ACTION.QUESTION:
            return 'asked'
        case ACTION.VOTE:
            return 'answered'
        default:
            return ''
    }
}