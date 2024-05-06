Tower Quest Game Algorithm:

1. Define the game parameters:
   - Number of levels (floors) in the tower: n
   - Difficulty levels: easy, medium, hard
   - Payout multiplier for each difficulty level: easyMultiplier, mediumMultiplier, hardMultiplier
   - Base payout amount: basePayout
   - RTP (Return to Player) percentage: rtp

2. Calculate the total number of possible outcomes:
   - TotalOutcomes = n * numberOfDifficultyLevels

3. Determine the total payout amount for all possible outcomes:
   - TotalPayout = basePayout * TotalOutcomes

4. Compute the payout percentage per outcome:
   - PayoutPercentage = (TotalPayout / TotalOutcomes) * rtp

5. Develop a function to assess the win/loss probability for each level and difficulty:
   - CalculateWinLossProbability(level, difficulty):
     - If the difficulty is easy:
         - Calculate WinProbability based on the level, payout percentage, and easyMultiplier
     - Else if the difficulty is medium:
         - Calculate WinProbability based on the level, payout percentage, and



// js code 


const numberOfLevels = 10;
const difficultyLevels = ["easy", "medium", "hard"];
const easyMultiplier = 1.5;
const mediumMultiplier = 2.0;
const hardMultiplier = 3.0;
const basePayout = 100;
const rtp = 0.98; 

const totalOutcomes = numberOfLevels * difficultyLevels.length;
const totalPayout = basePayout * totalOutcomes;
const payoutPercentage = (totalPayout / totalOutcomes) * rtp;

function calculateWinLossProbability(level, difficulty) {
    let winProbability;
    let lossProbability;

    switch (difficulty) {
        case "easy":
            winProbability = (level / numberOfLevels) * payoutPercentage * easyMultiplier;
            break;
        case "medium":
            winProbability = (level / numberOfLevels) * payoutPercentage * mediumMultiplier;
            break;
        case "hard":
            winProbability = (level / numberOfLevels) * payoutPercentage * hardMultiplier;
            break;
        default:
            winProbability = 0;
    }

    lossProbability = 1 - winProbability;

    return { winProbability, lossProbability };
}
function simulateGame() {
    let totalWinProbability = 0;

    for (let level = 1; level <= numberOfLevels; level++) {
        for (let difficulty of difficultyLevels) {
            const { winProbability, lossProbability } = calculateWinLossProbability(level, difficulty);
            totalWinProbability += winProbability;
        }
    }

    return totalWinProbability;
}

<!-- function call  -->
const overallWinProbability = simulateGame();
console.log("Overall Win Probability:", overallWinProbability);
