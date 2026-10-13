module.exports = {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
        'controllers/**/*.js',
        'models/**/*.js',
        'routes/**/*.js'
    ],
    testMatch: [
        '**/tests/**/*.test.js'
    ]
};
