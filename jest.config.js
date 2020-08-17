module.exports = {
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    },
    moduleFileExtensions: ["ts", "js"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    // testMatch: ["src/**/*.(test|spec).(ts|js)"],
    testPathIgnorePatterns: ["dist"],
    testEnvironment: "node"
};