const common = [
    'tests/*.feature',
    '--require-module ts-node/register',
    '--require tests/*e2e.ts',
    '--format progress-bar',
    '--format node_modules/cucumber-pretty'
].join(' ');

module.exports = {
    default: common
};
