# interrupt

![version](https://img.shields.io/jsr/v/%40117/interrupt?style=flat-square&color=%23ff51bc&label=version)
![status](https://img.shields.io/github/actions/workflow/status/117/interrupt/deploy.yml?style=flat-square)

A task queue for handling interrupt signals in Deno.

## Contents

- [Features](#features)
- [Install](#install)
- [Usage](#usage)
- [Contributing](#contributing)

## Features

- [x] Register tasks to be executed in sequence upon interrupt signals.
- [x] Handles `SIGINT` and `SIGTERM` signals gracefully.
- [x] Provides a globally accessible task queue via import.

## Install

For Deno:

```sh
$ deno add @117/interrupt
```

## Example

```ts
import { addTask } from "@117/interrupt";

const closeDatabaseConnection = async () =>
  console.log("closing database connection");

const saveUnsavedData = async () => console.log("saving unsaved data");

addTask(closeDatabaseConnection, { errorFn: (error) => console.error(error) });
addTask(saveUnsavedData);

console.log("app is running, press ctrl+c to exit");
```

## Contributing

Feel free to contribute and PR to your 💖's content.
