module.exports = {
    testEnvironment: "node",

    testMatch: [
        "**/tests/**/*.test.js"
    ],

    setupFilesAfterEnv: [
        "<rootDir>/tests/setup.js"
    ],

    collectCoverage: true,

    collectCoverageFrom: [
        "controllers/**/*.js",
        "!node_modules/**"
    ],

    coverageDirectory: "coverage",

    clearMocks: true,

    verbose: true
};