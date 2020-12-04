# Directory tree

## Evaluation criteria
We'll evaluate your effort on the following criteria (in order of importance):
1. **Does it work?** We should be able to run your code and see the correct output.
2. **Is it clean?** Within the time constraints, please give us your best effort at "production code".

Please submit your solution within 2 hours, **even if it isn't complete**.  A complete solution is an important, but it's not the only one. 

## Deliverable
We're expecting you to send your solution as a command line script implemented in Javascript. We should be able to execute your code as follows:

```bash
$ node directories.js
```

## The problem

A common method of organizing files on a computer is to store them in hierarchical directories. For instance:

```
photos/
  birthdays/
    joe/
    mary/
  vacations/
  weddings/
```

In this challenge, you will implement commands that allow a user to create, move and delete directories.

A successful solution will take the following input:

```
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST
```

and produce the following output

```
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
fruits
  apples
    fuji
grains
vegetables
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
foods
  fruits
    apples
      fuji
  grains
  vegetables
    squash
DELETE fruits/apples
Cannot delete fruits/apples - fruits does not exist
DELETE foods/fruits/apples
LIST
foods
  fruits
  grains
  vegetables
    squash
```

## Important considerations
- You should **not** implement an interactive console program that actually
creates folders on the host machine.
- You **should** implement a program that takes the above input line-by-line (either hard-coded
into your program, or reading it from a file) and produces exactly the output
shown above, while internally maintaining the directory structure.
- Do **not** use any 3rd party libraries. Make sure all the code is your own.
- Please include all **necessary instructions** for getting your code to run.

## Hint
This is a way you could structure your program

```javascript
/* directies.js */

// TODO: Define dirs logic 

dirs.run('CREATE fruits')
dirs.run('CREATE vegetables')
dirs.run('CREATE grains')
dirs.run('CREATE fruits/apples')
dirs.run('CREATE fruits/apples/fuji')
dirs.run('LIST')

// TODO: Implement the rest of the commands

```



