export interface Args {
    layoutPaths: string[];
    filePaths: string[];
    stdin: boolean;
}

const HELP = `Usage:
  keybench [layout...] [--] file...

Options:
  -h, --help  Show help

Examples:
  # Benchmark all built-in layouts against sample.go and sample.scala
  keybench sample.go sample.scala

  # Benchmark all built-in layouts plus mylayout1 and mylayout2 against sample.go
  keybench mylayout1.json mylayout2.json -- sample.go

  # Benchmark all built-in layouts against stdin
  keybench -`;

const isAskingForHelp = (arg: string) => /^(-h|--help)$/i.test(arg);

export default function parseArgs(argv: string[]): Args | string {
    const rawArgs = argv.slice(2);
    const separatorIndex = rawArgs.indexOf('--');
    const layoutPaths = rawArgs.slice(0, Math.max(separatorIndex, 0));
    const rawFilePaths = rawArgs.slice(separatorIndex + 1);
    const filePaths = rawFilePaths.filter(path => path !== '-');
    const stdin = filePaths.length < rawFilePaths.length;

    if (rawArgs.some(isAskingForHelp) || rawFilePaths.length === 0) {
        return HELP;
    }

    return {layoutPaths, filePaths, stdin};
}
