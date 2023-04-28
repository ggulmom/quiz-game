# Quiz Game App

This is a quze game app. User will be given three questions.


## User Interface and Rules
Initially, there are two buttons: click to start, show high scores. Clicking the button will strat the quiz game and display the Quetion and choices.

![](./asset/0%20Question.png)

30 second is given to solve all 3 questions. Remaining time is shown and it will be your score in the end.

The Quiz will end if

* remaining time becomes 0 -> your score is 0.
* you finish all questions in time -> remaining time is your score

You will get -10 second penalty if choose a wrong answer.

## Correct Answer
If you select the right answer in the previous question, the message at the bottom will say "Correct"

![](./asset/1%20Correct.png)

## Wrong Answer
If a wrong answer is selected, the message at the bottom will give the answer.

![](./asset/2%20Wrong.png)

## Adding Initial and score
After finishing a game, you can add your initial which will be then recorded with the score.

![](./asset/3%20Add%20Initial%20and%20Score.png)


## High Score Board
Score board will be shown when

* you click "Show High Scores" button or
* after a session finishes

![](./asset/4%20Score%20Board.png)

Score board shows top 10 scores + initials. If there are more than 10 scores, only top ten result will be displayed. 

### UI change in Score Board Display
Clear Scores button is given in the score table. If you click the button, all recorded scores will be erased.
The "Show High Scores" button changes to "Hide High Scores"; i.e. you can toggle the view by clicking the same button multiple times.

## Restarting the Quiz
"Click to Start" will reset the game and the quiz will start over. This operation does not clear the recorded scores.

