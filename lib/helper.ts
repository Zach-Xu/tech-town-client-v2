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
            return '1 year ago'
        }
        return year + ' years ago'
    } else if (month > 0) {
        if (month === 1) {
            return '1 month ago'
        }
        return month + ' months ago'
    } else if (day > 0) {
        if (day === 1) {
            return '1 day ago'
        }
        let ret = day + 'days ago'
        if (day >= 7 && day < 14) {
            ret = '1 week ago'
        } else if (day >= 14 && day < 21) {
            ret = '2 weeks ago'
        } else if (day >= 21 && day < 28) {
            ret = '3 weeks ago'
        } else if (day >= 28 && day < 31) {
            ret = '4 weeks ago'
        }
        return ret
    } else if (hour > 0) {
        if (hour === 1) {
            return '1 hour ago'
        }
        return hour + ' hours ago'
    } else if (minute > 0) {
        if (minute === 1) {
            return '1 min ago'
        }
        return minute + ' mins ago'
    } else if (second > 0) {
        if (second === 1) {
            return '1 sec ago'
        }
        return second + ' secs ago'
    } else {
        return 'just now'
    }
}