# Contributing to ChessGame‑Elixir

Welcome! Thanks for your interest in contributing to this project.\
This document explains how you can help improve **ChessGame‑Elixir**.

## Table of Contents

-   [Code of Conduct](#code-of-conduct)
-   [How to Contribute](#how-to-contribute)
    -   [Reporting Bugs](#reporting-bugs)
    -   [Requesting Features](#requesting-features)
    -   [Submitting Pull Requests](#submitting-pull-requests)
-   [Coding Standards](#coding-standards)
-   [Testing](#testing)
-   [Releases](#releases)
-   [Non‑Code Contributions](#non-code-contributions)
-   [License](#license)

## Code of Conduct

Please be kind, respectful, and constructive. Remember that every
contributor invests time and effort to improve this project.

## How to Contribute

### Reporting Bugs

1.  Check the
    [Issues](https://github.com/ilyasbozdemir/chessgame-elixir/issues)
    page to see if the issue already exists.\
2.  If not, create a new issue using the **Bug** label:
    -   Describe what you were doing when the bug occurred.\
    -   Explain the expected vs actual behavior.\
    -   Add logs, screenshots, or steps to reproduce if possible.\
    -   Mention your system and Elixir/Phoenix versions.

### Requesting Features

1.  Review existing enhancement issues before opening a new one.\
2.  If your idea is new, create a new issue with the **Enhancement**
    label:
    -   Explain the problem or opportunity.\
    -   Describe how the new feature helps users.\
    -   Provide technical details or a proposed solution if you can.

### Submitting Pull Requests

1.  Fork the repository and create a new branch:

    ``` bash
    git clone https://github.com/ilyasbozdemir/chessgame-elixir.git
    git checkout -b feature/my-awesome-feature
    ```

2.  Implement your changes and ensure they follow the project's coding
    style.\

3.  Run all tests and make sure everything passes.\

4.  Commit your changes with clear messages.\

5.  Push your branch and open a Pull Request to `main`:

    -   Use a concise title describing your change.\
    -   Include details about *what* and *why* you changed.\
    -   Reference related issues, e.g., `Closes #123`.

## Coding Standards

-   Use idiomatic **Elixir** and **Phoenix** conventions.\
-   Write small, pure functions whenever possible.\
-   Follow consistent formatting (`mix format`).\
-   Add documentation comments (`@doc`) for public functions and
    modules.

## Testing

All new features or bug fixes should include relevant tests. Run tests
with:

``` bash
mix test
```

## Releases

Only maintainers handle tagged releases and deployment. PRs should not
modify version numbers.

## Non‑Code Contributions

We also welcome:\
- Improving documentation or README examples.\
- Translating content.\
- Creating demo videos, tutorials, or blog posts about the project.

## License

By contributing, you agree that your work will be licensed under the
same license as the project.
