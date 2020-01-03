const exec = require('child_process').exec;
const watch = require('node-watch');

/**
 * vscode开发启动这个脚本进行监听编译
 */

watch(['./miniprogram/app.ts', './miniprogram/pages'], { recursive: true }, function(evt, name) {
    if (name.split('.').pop() === 'ts') {
        console.log('监听到TypeScript文件改动，重新编译中...');
        exec('npm run tsc');
    }
});

console.log('TypeScript自动编译脚本已成功运行...');