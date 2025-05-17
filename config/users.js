export const USERS = {
    standard: {
        username: process.env.STANDARD_USER,
        password: process.env.PASSWORD,
        description: 'Standard user with full access'
    },
    locked: {
        username: process.env.LOCKED_USER,
        password: process.env.PASSWORD,
        description: 'Locked out user for testing error scenarios'
    },
    problem: {
        username: process.env.PROBLEM_USER,
        password: process.env.PASSWORD,
        description: 'User with problematic behavior'
    },
    performance: {
        username: process.env.PERFORMANCE_USER,
        password: process.env.PASSWORD,
        description: 'User for testing performance scenarios'
    },
    error: {
        username: process.env.ERROR_USER,
        password: process.env.PASSWORD,
        description: 'User for testing error scenarios'
    },
    visual: {
        username: process.env.VISUAL_USER,
        password: process.env.PASSWORD,
        description: 'User for visual testing'
    }
};

/**
 * Get user credentials by user type
 * @param {keyof typeof USERS} userType - Type of user (standard, locked, problem, etc.)
 * @returns {{username: string, password: string}} User credentials
 * @throws {Error} If user type is invalid
 */
export function getUser(type = process.env.USER_TYPE || 'standard') {
    const user = USERS[type];
    if (!user) {
        throw new Error(`Invalid user type: ${type}`);
    }

    return user;
} 