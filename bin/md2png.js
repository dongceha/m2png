#!/usr/bin/env node

// 如果你需要这个文件是 cli 执行时的入口，需要在 package.json 中的 bin 字段来指定
// import 走 module
// require 走 mian
// yarn XX 走 bin

// 这个入口的作用
// 1、解析 CLI 参数 process.agrv
// 2、调用 模块中的功能实现

const program = require('commander')
const pkg = require('../package')
const md2Png = require('..')   // lib/index.js
const inquirer = require('inquirer')

program
  .version(pkg.version)
  .usage('<input>')  // 用户传递过来的 md 文件路径
  .option('-o, --output <output>', '输出图片文件路径')
  .option('-w, --width <width>', '图片宽度')
  .on('--help', console.log)
  .parse(process.argv)  // process.argv 用户输入和路径，而上面的 commander 是对其进行解析 
  .args.length || program.help()

inquirer.prompt([
  {type: 'number', name: 'width', message: '图片宽度'}
]).then(answers => {
  const { args, output, width } = program
  const [ input ] = args
  console.log(md2Png(input, { output, width: ~~answers.width }))
})
