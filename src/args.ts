import * as process from 'process';

export interface Args {
    layoutPaths: string[];
    filePaths: string[];
    stdin: boolean;
}

const HELP = `Usage:
  $ keybench [layout...] [--] file...

Options:
  -h, --help  Show help

Examples:
  Benchmark all built-in layouts against sample.scala and sample.go:
  $ keybench sample.scala sample.go

  Benchmark all built-in layouts plus mylayout1 and mylayout2
  against sample.scala:
  $ keybench mylayout1.json mylayout2.json -- sample.scala

  Benchmark all built-in layouts against stdin:
  $ keybench -`;

const askingForHelp = (arg: string) => /-h|--help/.test(arg);

export default function parseArgs(): Args {
    const rawArgs = process.argv.slice(2);
    const separatorIndex = rawArgs.indexOf('--');
    const layoutPaths = rawArgs.slice(0, separatorIndex);
    const rawFilePaths = rawArgs.slice(separatorIndex + 1);
    const filePaths = rawFilePaths.filter(path => path !== '-');
    const stdin = filePaths.length < rawFilePaths.length;

    if (rawArgs.some(askingForHelp) || rawFilePaths.length === 0) {
        console.log(HELP);
        process.exit(2);
    }

    return {layoutPaths, filePaths, stdin};
}
