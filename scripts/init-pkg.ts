import { getGitUrl, rootDir, cmdGet } from './utils';
import { setRepo } from './set-repo';
import { prompt } from 'enquirer';
import * as semver from 'semver';
import * as path from 'path';
import chalk from 'chalk';
import * as fs from 'fs';

export enum RepoType {
  multi = 'multi',
  mono = 'mono',
}

const rootPath = rootDir();
const rootPkgPath = path.resolve(rootPath, 'package.json');
const rootPkgJson = require(rootPkgPath);

export interface Config {
  description: string;
  repoType: RepoType;
  keywords: string;
  version: string;
  license: string;
  author: string;
  name: string;
  git: string;
}

async function getConfig() {
  const initConfig: Config = {
    keywords: rootPkgJson.keywords.join(','),
    author: cmdGet('git config user.name'),
    description: rootPkgJson.description,
    name: path.basename(rootPath),
    license: rootPkgJson.license,
    repoType: RepoType.multi,
    git: getGitUrl(),
    version: '0.0.0',
  };

  const reply = await prompt<Config>([
    // 1.获取项目名称
    {
      initial: initConfig.name,
      message: '输入项目名称：',
      type: 'input',
      name: 'name',
    },
    // 2.获取版本号version
    {
      validate(value) {
        // 校验版本号
        if (!semver.valid(value)) {
          return `invalid version: ${value}`;
        }
        return true;
      },
      initial: initConfig.version,
      message: '输入版本号(version)：',
      name: 'version',
      type: 'input',
    },
    // 3.获取description
    {
      initial: initConfig.description,
      message: '输入项目描述(description)：',
      name: 'description',
      type: 'input',
    },
    // 4.获取keywords
    {
      initial: initConfig.keywords,
      message: '输入关键词(keywords)：',
      name: 'keywords',
      type: 'input',
    },
    // 5.获取author
    {
      initial: initConfig.author,
      message: '输入作者(author)：',
      name: 'author',
      type: 'input',
    },
    // 6.获取license
    {
      initial: initConfig.license,
      message: '输入license：',
      name: 'license',
      type: 'input',
    },
    // 7.repo类型
    {
      choices: [{ name: RepoType.mono }, { name: RepoType.multi }],
      initial: RepoType.multi as any,
      message: '选择repo类型：',
      name: 'repoType',
      type: 'select',
    },
  ]);

  const config = { ...initConfig, ...reply };

  console.log(chalk.green(JSON.stringify(config, null, 2)));

  const { confirm } = await prompt<{ confirm: string }>({
    type: 'confirm',
    name: 'confirm',
    message: '是否确认',
  });

  if (!confirm) return Promise.reject('cancel');

  return config;
}
async function setup() {
  try {
    const { start } = await prompt<{ start: boolean }>({
      message: '是否开始初始化？',
      type: 'confirm',
      initial: false,
      required: true,
      name: 'start',
    });
    if (!start) return;

    console.log(chalk.cyan('初始化package.json开始...'));
    const config = await getConfig();
    //  console.log(config);
    // 3.根据description填写README.md
    // 5.获取远程git地址

    // 设置项目名称
    rootPkgJson.name = config.name;
    // 设置版本号version
    rootPkgJson.version = config.version;
    // 设置description
    rootPkgJson.description = config.description;
    // 设置keywords
    rootPkgJson.keywords = config.keywords.trim().split(',');
    // 设置author
    rootPkgJson.author = config.author;
    // 设置git
    rootPkgJson.repository.url = 'git+' + config.git;
    rootPkgJson.bugs.url = config.git.replace('.git', '/issues');
    rootPkgJson.homepage = config.git.replace('.git', '#readme');

    fs.writeFileSync(rootPkgPath, JSON.stringify(rootPkgJson, null, 2) + '\n');

    console.log(chalk.cyan('初始化package.json完成...'));

    console.log(chalk.cyan('初始化repo开始...'));
    setRepo(config);
    console.log(chalk.cyan('初始化repo完成...'));
  } catch (e) {
    console.log(e);
  }
}
setup();
