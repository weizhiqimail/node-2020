process.on('beforeExit', code => {
    console.log('process beforeExit', code);
});

process.on('exit', code => {
    console.log('process exit', code);
});

console.log('process api');
console.log(process.platform);
console.log(process.argv);
// 当前工作目录  current work directory
console.log(process.cwd());
// 环境变量
// console.log(process.env);

let args = process.argv.slice(2);

function parseTerminalPrefixArgs(args, prefix = '--') {
    return args.reduce((prev, curr, index, arr) => {
        if (index % 2 === 0 && curr.startsWith(prefix)) {
            prev[curr.slice(2)] = arr[index + 1];
        }
        return prev;
    }, {});
}

function parseTerminalEqualArgs(args, separator = '=') {
    return args.reduce((prev, curr) => {
        let [key, value] = curr.split(separator);
        prev[key] = value;
        return prev;
    }, {});
}

console.log(parseTerminalEqualArgs(args));
