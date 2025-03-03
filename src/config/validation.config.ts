import { MESSAGES } from '../constants/messages';

export const ValidationConfig = {
    USER: {
        USERNAME: {
            MIN: 3,
            MAX: 50,
        },
        EMAIL: {
            MIN: 5,
            MAX: 100,
        },
        PASSWORD: {
            MIN: 6,
            MAX: 100,
            REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/,
        },
    },
    TASK: {
        TITLE: {
            MIN: 3,
            MAX: 100,
        },
        DESCRIPTION: {
            MIN: 10,
            MAX: 500,
        },
    },
    ERROR_MESSAGES: {
        VALIDATION: {
            USERNAME: {
                MIN: MESSAGES.VALIDATION.USERNAME.MIN,
                MAX: MESSAGES.VALIDATION.USERNAME.MAX,
            },
            EMAIL: {
                INVALID: MESSAGES.VALIDATION.EMAIL.INVALID,
                MIN: MESSAGES.VALIDATION.EMAIL.MIN,
                MAX: MESSAGES.VALIDATION.EMAIL.MAX,
            },
            PASSWORD: {
                MIN: MESSAGES.VALIDATION.PASSWORD.MIN,
                MAX: MESSAGES.VALIDATION.PASSWORD.MAX,
                PATTERN: MESSAGES.VALIDATION.PASSWORD.PATTERN,
            },
            TASK: {
                TITLE: {
                    MIN: MESSAGES.VALIDATION.TASK.TITLE.MIN,
                    MAX: MESSAGES.VALIDATION.TASK.TITLE.MAX,
                },
                DESCRIPTION: {
                    MIN: MESSAGES.VALIDATION.TASK.DESCRIPTION.MIN,
                    MAX: MESSAGES.VALIDATION.TASK.DESCRIPTION.MAX,
                },
                STATUS: MESSAGES.VALIDATION.TASK.STATUS,
            },
        },
    },
} as const; 