# Tic-tac-toe

[Tic-tac-toe/Naughts and Crosses](https://en.wikipedia.org/wiki/Tic-tac-toe) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a diagonal, horizontal, or vertical row is the winner.


This project is built on the design principles of JavaScript [Factory functions](https://en.wikipedia.org/wiki/Factory_(object-oriented_programming)) and the [Module pattern](https://en.wikipedia.org/wiki/Module_pattern).

[Live Preview](https://rajdeepdev10.github.io/tic-tac-toe) on Github Pages

Here is my description of Factory Functions and the Module Pattern

### Factory Function

This is a way of creating new objects. It is different from constructors by not having `this.something` like the constructor function.

In this project, `player` is a Factory function.

General rule is if there is need for multiple creation of some object, use a Factory function

### Module Pattern

The Module is more like a list of functions and variables stored inside a *module*. Modules are created like the following code.


```javascript
const someModule = ((someParameter) => {
    let someVariable = ...;
    const someFunction = (someParameter) => someOutput;
    ...

    return{someFunction, someVariable ...}
})();
```

And then modules can be called like the following

```javascript
someModule.someFunction()
```

In this project, `gameBoard` is an example of a Module. It contains variables like `BOARD` which is an array representing the status of the game board and contains functions like `resetBoard` which can erase the board contents.

General rule is if there is need creating only a single object of something, use a Module



### Additional Comment
- The algorithm for the `checkWin()` function looks horrendous but is simple and does the job