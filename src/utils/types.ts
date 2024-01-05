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