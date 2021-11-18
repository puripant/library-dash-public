# Library Dash

## Project Directory

```
├── Backend       # Backend module
├── Frontend      # Frontend module
├── notebooks     # Data analysis
```

## To Run

download data from

```
https://drive.google.com/drive/folders/1wMOfj0Uo3I1uEKDPjnlSAy8Fa5yKKsgF?usp=sharing
```

and put inside `Backen/src/static/json` folder like an example below.

```
├── README.md
├── instance
├── requirements.txt
└── src
    └── static
        └── json # put 3 .json inside this folder
            ├── book.json
            ├── patron.json
            └── rent.json
```

then run to start application (need `Docker` to be running).

```
./run.sh
```
