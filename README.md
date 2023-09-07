# Usage

The idea of this package is to be able to apply eslint suggestions directly from the terminal.

# Installation

```bash
npm install -g eslint-suggestions-cli
```

Usage is as follows :

```bash
eslint . --format json | apply-suggestions
```

You can also run it without installation using :

```bash
eslint . --format json | npx eslint-suggestions-cli apply-suggestions
```

Note that this will change many files on disk, please use `git` or another version manager to be sure that you can review changes that are made.

You can apply the suggestions only for certain files simply by running :

```bash
eslint myfile.js --format json | apply-suggestions
```

You can create the "plint" alias for your project by adding the following in your `.bashrc` :

```bash
plint() {
    eslint . --format json | apply-suggestions
}
```

# Ideas

- Instead of simply applying all suggestions, have a small TUI that allows to interactively select the suggestion to apply
- Print the diff after the execution with explanation of each applied suggestion (non-interactive mode).

Feel free to contribute.
