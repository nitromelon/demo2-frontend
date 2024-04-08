# InnoFE - SWE30003 - Assignment 3

## Introduction

This is frontend app made of tauri + svelte.
Follow these steps to install and use Tauri:

## Prerequisites

1. **Install Rust**: Tauri is built on Rust. Install it by following the instructions on the [official Rust website](https://www.rust-lang.org/tools/install).

2. **Install Node.js and npm**: Tauri uses Node.js and npm for some of its tooling. Download Node.js and npm from the [official Node.js website](https://nodejs.org/en/download/).

3. **Install pnpm**: Tauri can also use pnpm for package management. Install it globally with npm:

    ```bash
    npm install -g pnpm
    ```

## Installation

1. **Install Tauri CLI**: The Tauri CLI helps you create and manage your Tauri applications. Install it globally with pnpm:

    ```bash
    pnpm add -g @tauri-apps/cli
    ```

2. **Create a new Tauri application**: Create a new Tauri application using the Tauri CLI. This will create a new directory with a basic Tauri application:

    ```bash
    tauri init
    ```

3. **Install dependencies**: Navigate into your new Tauri application directory and install the necessary dependencies:

    ```bash
    cd {this folder}
    pnpm install
    ```

## Usage

1. **Run your Tauri application**: Start your Tauri application with the following command:

    ```bash
    pnpm tauri dev
    ```

2. **Build your Tauri application**: When you're ready to build a production version of your application, use the following command:

    ```bash
    pnpm tauri build
    ```

This will create a standalone application in the `src-tauri/target/release` directory.

## Testing

I use playwright to test the app. To run the test, use the following command:

```bash
pnpm test
```

Note: if you don't have playwright installed, you can install it by running the following command:

```bash
pnpm exec playwright install
```

> Note: Tauri also requires some additional dependencies depending on your operating system. You can find more information about these in the [Tauri guides](https://tauri.app/v1/guides/).
