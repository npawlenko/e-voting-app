export type User = {
    id: number
    firstName: string
    lastName: string
    email: string
}

export type PollInput = {
    question: string
    closesAt: Date
    nonSystemUsersEmails: string[]
    systemUsers: number[]
    isPublic: boolean
    answers: PollAnswerInput[]
}

export type PollAnswerInput = {
    answer: string
}

export type PollData = {
    id: string
    question: string
    createdAt: string
    closesAt: string
    isPublic: boolean
    creator: User
    systemUsers: User[]
    nonSystemUsersEmails: string[]
    answers: PollAnswerData[]
    votes: VoteData[]
    votePlaced: boolean
}

export type PollAnswerData = {
    id: string,
    answer: string
}

export type VoteData = {
    id: string
    answer: {
        id: string
    }
}