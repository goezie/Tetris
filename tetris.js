// setup canvases
const canvas = document.getElementById("tetrisCanvas");
const ctx = canvas.getContext('2d');
canvas.width = 200;
canvas.height = 400;
const canvasNext = document.getElementById("nextBlock");
const ctxNext = canvasNext.getContext('2d');
canvasNext.width = 80;
canvasNext.height = 80;

// variables
const blockSize = 20;
var blockPosition = 
	{
		x : 3,
		y : 18
	};
const gameSpeeds = [800, 600, 450, 350, 270, 200, 150, 110, 80, 60];
var gameSpeed = gameSpeeds[0];
var nextBlock;
var currentBlock;
var currentRotation = 0;
var canMove = true;
var lines = 0;
var level = 1;
var points = 0;
var isGameOver = false;
var playingField = 
[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]
];
const IBlock = 
[
	[
		[0,0,0,0],
		[1,1,1,1],
		[0,0,0,0],
		[0,0,0,0]
	],
	[
		[0,0,1,0],
		[0,0,1,0],
		[0,0,1,0],
		[0,0,1,0]
	],
	[
		[0,0,0,0],
		[0,0,0,0],
		[1,1,1,1],
		[0,0,0,0]
	],
	[
		[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0],
		[0,1,0,0]
	]
];
const JBlock = 
[
	[
		[0,1,0,0],
		[0,1,1,1],
		[0,0,0,0],
		[0,0,0,0]
	],
	[
		[0,0,1,1],
		[0,0,1,0],
		[0,0,1,0],
		[0,0,0,0]
	],
	[
		[0,0,0,0],
		[0,1,1,1],
		[0,0,0,1],
		[0,0,0,0]
	],
	[	
		[0,0,1,0],
		[0,0,1,0],
		[0,1,1,0],
		[0,0,0,0]
	]
];
const LBlock =
[
	[
		[0,0,1,0],
		[1,1,1,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	[	
		[0,1,0,0],
		[0,1,0,0],
		[0,1,1,0],
		[0,0,0,0]
	],
	[
		[0,0,0,0],
		[1,1,1,0],
		[1,0,0,0],
		[0,0,0,0]
	],
	[
		[1,1,0,0],
		[0,1,0,0],
		[0,1,0,0],
		[0,0,0,0]
	]
];
const ZBlock =
[
	[	
		[1,1,0,0],
		[0,1,1,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	[
		[0,0,1,0],
		[0,1,1,0],
		[0,1,0,0],
		[0,0,0,0]
	],
	[
		[0,0,0,0],
		[1,1,0,0],
		[0,1,1,0],
		[0,0,0,0]
	],
	[
		[0,1,0,0],
		[1,1,0,0],
		[1,0,0,0],
		[0,0,0,0]
	]
];
const SBlock =
[
	[	
		[0,1,1,0],
		[1,1,0,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	[	
		[0,1,0,0],
		[0,1,1,0],
		[0,0,1,0],
		[0,0,0,0]
	],
	[
		[0,0,0,0],
		[0,1,1,0],
		[1,1,0,0],
		[0,0,0,0]
	],
	[	
		[1,0,0,0],
		[1,1,0,0],
		[0,1,0,0],
		[0,0,0,0]
	]
];
const pyramidBlock =
[
	[	
		[0,1,0,0],
		[1,1,1,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	[
		[0,1,0,0],
		[0,1,1,0],
		[0,1,0,0],
		[0,0,0,0]
	],
	[
		[0,0,0,0],
		[1,1,1,0],
		[0,1,0,0],
		[0,0,0,0]
	],
	[
		[0,1,0,0],
		[1,1,0,0],
		[0,1,0,0],
		[0,0,0,0]
	]
];
const squareBlock =
[
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0],
		[0,0,0,0]
	],
	[
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0],
		[0,0,0,0]
	]
];

// core functions
var timer = setInterval(gameLoop, gameSpeed);
function gameLoop()
{
	if(!isGameOver)
	{
		moveBlockDown();
	}
}
function startGame() 
{
	setNextBlock();
	getNextBlock();
	setNextBlock();
	handleMovement();
	drawBlock(currentBlock);
}
function gameOver()
{
	isGameOver = true;
	const gameOverP = document.getElementById("gameOver");
	gameOverP.style.display = "block";
}
function updateScreen() 
{
	ctx.clearRect(0,0, canvas.width, canvas.height);
	drawPlayingField();
	drawBlock(currentBlock);
}
function drawPlayingField() 
{
	for (i = 0; i < 40; i++) 
	{
		for (j = 0; j < 10; j++) 
		{
			if (playingField[i][j] == 1) 
			{
				ctx.beginPath();
				ctx.rect(
					j * blockSize, 
					(i * blockSize) - canvas.height, 
					blockSize, 
					blockSize);
				ctx.fillStyle = "#999";
				ctx.fill();
				ctx.lineWidth = 2;
				ctx.strokeStyle = "white";
				ctx.stroke();
			}
		}
	}
}
function drawBlock(block) 
{
	for (i = 0; i < 4; i++) 
	{
		for (j = 0; j < 4; j++) 
		{
			if (block[currentRotation][i][j] == 1) 
			{
				ctx.beginPath();
				ctx.rect(
					j * blockSize + blockPosition.x * blockSize,
					(i * blockSize + blockPosition.y * blockSize) - canvas.height,
					blockSize, 
					blockSize);
				ctx.fillStyle = "#999";
				ctx.fill();
				ctx.lineWidth = 2;
				ctx.strokeStyle = "white";
				ctx.stroke();
			}
		}
	}
}
function drawNextBlock(block) 
{
	ctxNext.clearRect(0,0, canvasNext.width, canvasNext.height);
	for (i = 0; i < 4; i++) 
	{
		for (j = 0; j < 4; j++) 
		{
			if (block[currentRotation][i][j] == 1) 
			{
				ctxNext.beginPath();
				ctxNext.rect(
					j * blockSize,
					i * blockSize,
					blockSize, 
					blockSize);
				ctxNext.fillStyle = "#999";
				ctxNext.fill();
				ctxNext.lineWidth = 2;
				ctxNext.strokeStyle = "white";
				ctxNext.stroke();
			}
		}
	}
}
function setNextBlock() 
{
	var rnd = randomIntFromRange(0, 6);
	switch(rnd) 
	{
		case 0:
			nextBlock = IBlock;
			break;
		case 1:
			nextBlock = LBlock;
			break;
		case 2:
			nextBlock = JBlock;
			break;
		case 3:
			nextBlock = pyramidBlock;
			break;
		case 4:
			nextBlock = ZBlock;
			break;
		case 5:
			nextBlock = SBlock;
			break;
		case 6:
			nextBlock = squareBlock;
			break;
		default:
			console.log("int not in one of the switch cases...");
	}
	drawNextBlock(nextBlock);
}
function getNextBlock() 
{
	currentBlock = nextBlock;
}

// gameplay functions
function moveBlockDown() 
{
	blockPosition.y += 1;
	canMove = true;
	checkCollissions();
	if(canMove)
	{
		updateScreen();
	} else
	{
		blockPosition.y += -1;
		addBlockToPlayingField(currentBlock);
		//get next block
		blockPosition.x = 3;
		blockPosition.y = 18;
		getNextBlock();
		drawBlock(currentBlock);
		setNextBlock();
	}
}
function checkCollissions() 
{
	canMove = true;
	for (i = 0; i < 4; i++) 
	{
		for (j = 0; j < 4; j++) 
		{
			if (currentBlock[currentRotation][i][j] == 1) 
			{
				if (blockPosition.y + i < 40) 
				{
					if(	playingField[blockPosition.y + i][blockPosition.x + j] 
						== 1 || 
						blockPosition.x + j < 0 ||
						blockPosition.x + j > 9)
					{
						canMove = false;
						return;
					}
				}else 
 				{
 					canMove = false;
 					return;
 				}
			}
		}
	}
}
function addBlockToPlayingField(block) 
{
	for (i = 0; i < 4; i++) 
	{
		for (j = 0; j < 4; j++) 
		{
			if (block[currentRotation][i][j] == 1) 
			{	
				if (blockPosition.y < 20)
				{
					gameOver();
				}	
				playingField[i + blockPosition.y][j + blockPosition.x] = 1;
			}
		}
	}
	checkFullLines();
}
function checkFullLines() 
{
	var isFullLine;
	var fullLines = 0;
	for (i = 0; i < 40; i++) 
	{
		isFullLine = true;
		for (j = 0; j < 10; j++) 
		{
			if (playingField[i][j] == 0) 
			{
				isFullLine = false;
				j = 10; // escape j loop
			}
		}
		if(isFullLine)
		{
			lines++
			if( lines % 5 == 0)
			{
				increaseLevel();
				gameSpeed = gameSpeeds[level - 1];	
			}
			fullLines++;
			handleFullLine(i);
		}
	}
	switch(fullLines)
	{
		case 1: 
			handlePoints(10 * level);
			break;
		case 2:
			handlePoints(25 * level);
			break;
		case 3:
			handlePoints(45 * level);
			break;
		case 4: 
			handlePoints(70 * level);
			break;
	}
}
function increaseLevel()
{
	if (level < 10)
	{
		level++
		const levelSpan = document.getElementById("level");
		levelSpan.innerHTML = level.toString();
	}
}

function handleFullLine(fullRowIndex)
{
	for(j = fullRowIndex; j > 0; j--)
	{
		for(k = 0; k < 10; k++)
		{
			// replace blocks with blocks one row above
			playingField[j][k] = playingField[j - 1][k];
		}
	}
	// reset top line to 0's
	for (j = 0; j < 10; j++)
	{
		playingField[0][j] = 0;
	}
}
function handlePoints(pts)
{
	// more to come later maybe.
	points += pts;
	var pointsSpan = document.getElementById("points");
	pointsSpan.innerHTML = points.toString();
}

// keyboard controls
//window.addEventListener("keydown", handleMovement)
var pressedKeys = {};
var firstMove = {
	KeyA: true,
	KeyD: true,
	Space: true,
	KeyS: true,
	KeyW: true
};
var secondMove = {
	KeyA: false,
	KeyD: false,
	Space: false,
	KeyS: false,
	KeyW: false
};
var timers = {}
window.onkeyup = function(e) 
{ 
	pressedKeys[e.code] = false;
	firstMove[e.code] = true;
	secondMove[e.code] = false;
}
window.onkeydown = function(e) 
{ 
	pressedKeys[e.code] = true;
}
var keyListenerTimer;
function handleMovement() 
{
	if(!isGameOver) {
		if(pressedKeys['KeyA'] == true) 
		{
			if (firstMove['KeyA']) 
			{
				handleA();
				secondMove.KeyA = true;
				timers.KeyA = setTimeout(handleA, 100);

			}
			firstMove['KeyA'] = false;
		}
		if(pressedKeys['KeyD'] == true) 
		{
			if (firstMove['KeyD']) 
			{
				handleD();
				secondMove.KeyD = true;
				timers.KeyD = setTimeout(handleD, 100);

			}
			firstMove['KeyD'] = false;
		}
		if( pressedKeys['KeyS'] == true)
		{
			if (firstMove['KeyS']) 
			{
				handleS();
				secondMove.KeyS = true;
				timers.KeyS = setTimeout(handleS, 100);

			}
			firstMove['KeyS'] = false;
		}
		if(pressedKeys['Space'] == true)
		{
			if (firstMove['Space']) 
			{
				handleSpace();
			}
			firstMove['Space'] = false;
		}
		if(pressedKeys['KeyW'] == true)
		{
			if (firstMove['KeyW']) 
			{
				handleW();
			}
			firstMove['KeyW'] = false;
		}
		keyListenerTimer = setTimeout(handleMovement, 10);
	}
}
function handleA() 
{
	if(pressedKeys['KeyA'] == true) 
	{
		blockPosition.x += -1;
		checkCollissions();
		if(canMove)
		{
			updateScreen();
		} else
		{
			blockPosition.x += 1;
		}
		if(secondMove.KeyA == true)
		{
			timers.KeyA = setTimeout(handleA, 30)
		}
	}
}
function handleD()
{
	if(pressedKeys['KeyD'] == true) 
	{
		blockPosition.x += 1;
		checkCollissions();
		if(canMove)
		{
			updateScreen();
		} else
		{
			blockPosition.x += -1;
		}
		if(secondMove.KeyD == true)
		{
			timers.KeyD = setTimeout(handleD, 30)
		}
	}
}
function handleS()
{
	if( pressedKeys['KeyS'] == true) 
	{ 
		handlePoints(level);
		moveBlockDown();
		clearInterval(timer);
		timer = setInterval(gameLoop, gameSpeed);
		if(secondMove.KeyS == true)
		{
			timers.KeyS = setTimeout(handleS, 25)
		}
	}
}
function handleSpace()
{
	if(currentRotation == 0)
	{
		currentRotation = 3;
	}
	else
	{
		currentRotation += -1;
	}
	checkCollissions();

	if(canMove) {
		updateScreen();
	} else
	{
		if(currentBlock != IBlock)
		{
			JLSTZWallkickTestsCounterClockwise(currentBlock);
		} else if (currentBlock == IBlock)
		{
			IWallkickTestsCounterClockwise(currentBlock);
		}
	}
}
function handleW() 
{
	if(currentRotation == 3)
	{
		currentRotation = 0;
	}
	else
	{
		currentRotation += 1;
	}
	checkCollissions();

	if(canMove) {
		updateScreen();
	} else
	{
		if(currentBlock != IBlock)
		{
			JLSTZWallkickTestsClockwise(currentBlock);
		} else if (currentBlock == IBlock)
		{
			IWallkickTestsClockwise(currentBlock);
		}
	}
}

// wallkick functions (SRS wallkick rules), google it.
function JLSTZWallkickTestsClockwise(block)  //keyE
{
	if(currentRotation == 0) // currentRotation 3 >> 0
	{
		blockPosition.x += -1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.y += 1;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 1;
				blockPosition.y += -3;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -1;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 1;
						blockPosition.y += 2;
						currentRotation = 3;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 1) // 0 >> 1
	{
		blockPosition.x += -1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.y += -1;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 1;
				blockPosition.y += 3;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -1;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 1;
						blockPosition.y += -2;
						currentRotation = 0;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 2) // 1 >> 2
	{
		blockPosition.x += 1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.y += 1;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += -1;
				blockPosition.y += -3;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += 1;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 1;
						blockPosition.y += 2;
						currentRotation = 1;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 3) // 2 >> 3
	{
		blockPosition.x += 1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.y += -1;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += -1;
				blockPosition.y += 3;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += 1;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += -1;
						blockPosition.y += -2;
						currentRotation = 2;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
}
function JLSTZWallkickTestsCounterClockwise(block)  //keyQ
{
	if(currentRotation == 0) // 1 >> 0
	{
		blockPosition.x += 1;
		checkCollissions();		
		if(!canMove) 
		{
			blockPosition.y += 1;
			checkCollissions();			
			if(!canMove) 
			{
				blockPosition.x += -1;
				blockPosition.y += -3;
				checkCollissions();				
				if(!canMove)
				{
					blockPosition.x += 1;
					checkCollissions();					
					if(!canMove)
					{
						blockPosition.x += -1;
						blockPosition.y += 2;
						currentRotation = 1;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 1) // 2 >> 1
	{
		blockPosition.x += -1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.y += -1;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 1;
				blockPosition.y += 3;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -1;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 1;
						blockPosition.y += -2;
						currentRotation = 2;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 2) // 3 >> 2
	{
		blockPosition.x += -1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.y += 1;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 1;
				blockPosition.y += -3;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -1;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 1;
						blockPosition.y += 2;
						currentRotation = 3;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 3) // 0 >> 3
	{
		blockPosition.x += 1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.y += -1;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += -1;
				blockPosition.y += 3;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += 1;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += -1;
						blockPosition.y += -2;
						currentRotation = 0;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
}
function IWallkickTestsClockwise(block) //keyE
{
	if(currentRotation == 0) // currentRotation 3 >> 0
	{
		blockPosition.x += 1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += -3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 3;
				blockPosition.y += 2;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -3;
					blockPosition.y += -3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 2;
						blockPosition.y += 1;
						currentRotation = 3;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 1) // 0 >> 1
	{
		blockPosition.x += -2;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += 3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += -3;
				blockPosition.y += 1;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += 3;
					blockPosition.y += -3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += -1;
						blockPosition.y += 2;
						currentRotation = 0;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 2) // 1 >> 2
	{
		blockPosition.x += -1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += 3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += -3;
				blockPosition.y += -2;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += 3;
					blockPosition.y += 3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += -2;
						blockPosition.y += -1;
						currentRotation = 1;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 3) // 2 >> 3
	{
		blockPosition.x += 2;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += -3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 3;
				blockPosition.y += -1;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -3;
					blockPosition.y += 3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 1;
						blockPosition.y += -2;
						currentRotation = 2;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
}
function IWallkickTestsCounterClockwise(block)	//keyQ 
{
	if(currentRotation == 0) // currentRotation 1 >> 0
	{
		blockPosition.x += 2;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += -3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 3;
				blockPosition.y += -1;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -3;
					blockPosition.y += 3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 1;
						blockPosition.y += -2;
						currentRotation = 1;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 1) // 2 >> 1
	{
		blockPosition.x += 1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += -3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += 3;
				blockPosition.y += 2;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += -3;
					blockPosition.y += -3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += 2;
						blockPosition.y += 1;
						currentRotation = 2;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 2) // 3 >> 2
	{
		blockPosition.x += -2;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += 3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += -3;
				blockPosition.y += 1;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += 3;
					blockPosition.y += -3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += -1;
						blockPosition.y += 2;
						currentRotation = 3;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
	if(currentRotation == 3) // 0 >> 3
	{
		blockPosition.x += -1;
		checkCollissions();
		
		if(!canMove) 
		{
			blockPosition.x += 3;
			checkCollissions();
			
			if(!canMove) 
			{
				blockPosition.x += -3;
				blockPosition.y += -2;
				checkCollissions();
				
				if(!canMove)
				{
					blockPosition.x += 3;
					blockPosition.y += 3;
					checkCollissions();
					
					if(!canMove)
					{
						blockPosition.x += -2;
						blockPosition.y += -1;
						currentRotation = 0;
						return;
					} else 
					{
						updateScreen();
					}
				}else 
				{
					updateScreen();
				}
			}else 
			{
				updateScreen();
			}
		} else 
		{
			updateScreen();
		}
	}
}

// init
startGame();

// utility functions
function randomIntFromRange(min, max) 
{
	return Math.floor(Math.random() * (max - min + 1) + min);
}