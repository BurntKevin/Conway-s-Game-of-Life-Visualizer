# Plays Conway's Game of Life
# Compile with a board

# Requires (from 'boardX.s'):
# - N (word): board dimensions
# - board (byte[][]): initial board state
# - newBoard (byte[][]): next board state

	.data
iterationNumber: .asciiz "# Iterations: "
iterationAfterP1: .asciiz "=== After iteration "
iterationAfterP2: .asciiz " ===\n"
dot: .asciiz "."
hashtag: .asciiz "#"
newLine: .asciiz "\n"

# Provides:
	.globl	main
	.globl	decideCell
	.globl	neighbours
	.globl	copyBackAndShow

# .TEXT <main>
	.text

main:
	# $s0 = maxiters, $s1 = n, $s2 = i
	# $s3 = N, $s4 = j, $s5 = nn
	# t0 = rowSize, $t1 = matrixSize
	# $t2 = matrixAddress, $t3 = matrixStartAddress, $t4 = matrixValue

	# Set up stack frame
	sw $fp, -4($sp)	# Push $fp
	la $fp, -4($sp)	# Set up $fp
	sw $ra, -4($fp)	# Save $ra
	sw $s0, -8($fp)	# Save $s0
	sw $s1, -12($fp)	# Save $s1
	sw $s2, -16($fp)	# Save $s2
	sw $s3, -20($fp)	# Save $s3
	sw $s4, -24($fp)	# Save $s4
	sw $s5, -28($fp)	# Save $s5
	addi $sp, $sp, -32	# Update $sp

	lw $s3, N	# Obtaining N

	# Reserving $s0 for maxiters	# int maxiters

	li $v0, 4	# printf("# Iterations: ")
	la $a0, iterationNumber
	syscall

	li $v0, 5	# scanf("%d", &maxiters)
	syscall
	move $s0, $v0

	li $s1, 1	# int n = 1
	loopNumberOfIterations:	# Level 1 while loop
		bgt $s1, $s0, endLoopNumberOfIterations	# n <= maxiter condition

		li $s2, 0	# int i = 0
		loopSizeOfRow:	# Level 2 while loop
		bge $s2, $s3, endLoopSizeOfRow	# i < N condition

			li $s4, 0	# int j = 0
			loopSizeOfColumn:	# Level 3 while loop
				bge $s4, $s3, endLoopSizeOfColumn	# j < N condition

				move $a0, $s2	# Passing i
				move $a1, $s4	# Passing j
				jal neighbours	# Calling neighbour function
				move $s5, $v0	# int nn = neighbours(i, j)

				# Calculating matrixSize for [i][j]
				mul $t0, $s2, $s3	# rowSize = rowSize * N
				addu $t1, $t0, $s4	# matrixSize = rowSize + column

				lb $t4, board($t1);	# matrixValue = board[i][j]'s value
				move $a0, $t4	# Passing board[i][j]
				move $a1, $s5	# Passing nn
				jal decideCell	# decideCell(board[i][j], nn)

				sb $v0, newBoard($t1)	# newBoard[i][j] = decideCell(board[i][j], nn)

				addi $s4, $s4, 1	# j++
				j loopSizeOfColumn
			endLoopSizeOfColumn:

			addi $s2, $s2, 1	# i++
			j loopSizeOfRow
		endLoopSizeOfRow:

		# printf("=== After iteration %d ===\n", n);
		li $v0, 4	# printf("=== After iteration ")
		la $a0, iterationAfterP1
		syscall

		li $v0, 1	# printf("%d", n)
		move $a0, $s1
		syscall

		li $v0, 4	# printf(" ===\n")
		la $a0, iterationAfterP2
		syscall

		jal copyBackAndShow	# copyBackAndShow()

		addi $s1, $s1, 1	# n++
		j loopNumberOfIterations
	endLoopNumberOfIterations:

	# Remove stack frame
	lw $s5, -28($fp)	# Restore $s5
	lw $s4, -24($fp)	# Restore $s4
	lw $s3, -20($fp)	# Restore $s3
	lw $s2, -16($fp)	# Restore $s2
	lw $s1, -12($fp)	# Restore $s1
	lw $s0, -8($fp)	# Restore $s0
	lw $ra, -4($fp)	# Restore $ra
	la $sp, 4($fp)	# Restore $sp
	lw $fp, ($fp)	# Restore $fp

	li $v0, 0	# Return 0
	jr	$ra

	# Put your other functions here

decideCell:
	#s0 = old, $s1 = nn, $s2 = ret

	# Set up stack frame
	sw $fp, -4($sp)	# Push $fp
	la $fp, -4($sp)	# Set up $fp
	sw $ra, -4($fp)	# Save $ra
	sw $s0, -8($fp)	# Save $s0
	sw $s1, -12($fp)	# Save $s1
	sw $s2, -16($fp)	# Save $s2
	addi $sp, $sp, -20	# Update $sp

	# Reserving $s2 for char ret	# char ret

	move $s0, $a0	# Loading old
	move $s1, $a1	# Loading nn

	ifAliveCell:	# Major if statement
		bne $s0, 1, elseIfThreeNeighbours	# old == 1 condition

		ifLessThanTwoNeighbours:	# Sub if statement
			bge $s1, 2, elseifTwoOrThreeNeighbours	# nn < 2 condition

			li $s2, 0	# ret = 0
			
			j endStatusCheck
		elseifTwoOrThreeNeighbours:	# Sub elseif statement
			beq $s1, 2, elseifTwoOrThreeNeighboursConditionMet	# nn == 2 condition
			beq $s1, 3, elseifTwoOrThreeNeighboursConditionMet	# nn == 3 condition
			
			j elseOtherAmountsOfNeighbours
			elseifTwoOrThreeNeighboursConditionMet:
			li $s2, 1	# ret = 1
			
			j endStatusCheck
		elseOtherAmountsOfNeighbours:	# Sub else statement
			li $s2, 0	# ret = 0
			
			j endStatusCheck
	elseIfThreeNeighbours:
		bne $s1, 3, elseNotAliveOrNoThreeNeighbours	# nn == 3 condition

		li $s2, 1	# ret = 1
		
		j endStatusCheck
	elseNotAliveOrNoThreeNeighbours:
		li $s2, 0	# ret = 0
	endStatusCheck:

	move $v0, $s2	# Saving ret value

	# Remove stack frame
	lw $s2, -16($fp)	# Restore $s2
	lw $s1, -12($fp)	# Restore $s1
	lw $s0, -8($fp)	# Restore $s0
	lw $ra, -4($fp)	# Restore $ra
	la $sp, 4($fp)	# Restore $sp
	lw $fp, ($fp)	# Restore $fp

	jr $ra	# Return ret

neighbours:
	# $s0 = i, $s1 = j
	# $s2 = nn, $s3 = x, $s4 = y, $s5 = N
	# $t0 = i + x, $t1 = N - 1, $t2 = j + y
	# $t3 = rowSize, $t4 = matrixSize, $t5 = board[i + x][j + y]

	# Set up stack frame
	sw $fp, -4($sp)	# Push $fp
	la $fp, -4($sp)	# Set up $fp
	sw $ra, -4($fp)	# Save $ra
	sw $s0, -8($fp)	# Save $s0
	sw $s1, -12($fp)	# Save $s1
	sw $s2, -16($fp)	# Save $s2
	sw $s3, -20($fp)	# Save $s3
	sw $s4, -24($fp)	# Save $s4
	sw $s5, -28($fp)	# Save $s5
	addi $sp, $sp, -32	# Update $sp

	lw $s5, N	# Loading N
	move $s0, $a0	# Loading i
	move $s1, $a1	# Loading j

	li $s2, 0	# nn = 0

	li $s3, -1	# x = -1
	forXCoordinate:	# Cycle through nearby X coordinates
		bgt $s3, 1, endForXCoordinate	# x <= 1 condition

		li $s4, -1	# y = -1
		forYCoordinate:	# Cycle through nearby Y coordinates
			bgt $s4, 1, endForYCoordinate	# y <= 1 condition

			ifAtLeftOrRightWall:	# Outside of board on the x-axis
				add $t0, $s0, $s3	# i + x calculation
				bltz $t0, ifAtLeftOrRightWallConditionMet	# i + x < 0 condition

				addi $t1, $s5, -1	# N - 1 calculation
				bgt $t0, $t1, ifAtLeftOrRightWallConditionMet	# i + x > N - 1 condition
				j ifAtAboveOrBelowWall

				ifAtLeftOrRightWallConditionMet:
				j finalisingforYCoordinate	# continue
			ifAtAboveOrBelowWall:	# Outside of board on the y-axis
				add $t2, $s1, $s4	# j + y calculation
				bltz $t2, ifAtAboveOrBelowWallConditionMet	# j + y < 0 condition

				addi $t1, $s5, -1	# N - 1 calculation
				bgt $t2, $t1, ifAtAboveOrBelowWallConditionMet	# j + y > N - 1 condition
				j ifAtPoint
				ifAtAboveOrBelowWallConditionMet:
				j finalisingforYCoordinate	# continue
			ifAtPoint:	# The point is not a neighbour of itself
				bne $s3, 0, ifNeighbourPresent	# x == 0 condition
				bne $s4, 0, ifNeighbourPresent	# y == 0 condition

				j finalisingforYCoordinate	# continue
			ifNeighbourPresent:
				# Calculating matrixSize for [i + x][j + y]
				add $t0, $s0, $s3	# i + x calculation
				mul $t3, $t0, $s5	# rowSize = rowSize * N
				add $t2, $s1, $s4	# j + y calculation
				addu $t4, $t3, $t2	# matrixSize = rowSize + column

				lb $t5, board($t4);	# Loading board[i + x][j + y]
				bne $t5, 1, finalisingforYCoordinate	# board[i + x][j + y] == 1 condition
				addi $s2, $s2, 1	# nn++
			finalisingforYCoordinate:
			addi $s4, $s4, 1	# y++
			j forYCoordinate

		endForYCoordinate:

		addi $s3, $s3, 1	# x++
		j forXCoordinate
	endForXCoordinate:

	move $v0, $s2	# Returning nn

	# Remove stack frame
	lw $s5, -28($fp)	# Restore $s5
	lw $s4, -24($fp)	# Restore $s4
	lw $s3, -20($fp)	# Restore $s3
	lw $s2, -16($fp)	# Restore $s2
	lw $s1, -12($fp)	# Restore $s1
	lw $s0, -8($fp)	# Restore $s0
	lw $ra, -4($fp)	# Restore $ra
	la $sp, 4($fp)	# Restore $sp
	lw $fp, ($fp)	# Restore $fp

	jr $ra	# Returning nn

copyBackAndShow:
	# Set up stack frame
	sw $fp, -4($sp)	# Push $fp
	la $fp, -4($sp)	# Set up $fp
	sw $ra, -4($fp)	# Save $ra
	sw $s0, -8($fp)	# Save $s0
	sw $s1, -12($fp)	# Save $s1
	sw $s2, -16($fp)	# Save $s2
	addi $sp, $sp, -20	# Update $sp

	# $s0 = i, $s1 = N, $s2 = j
	# $t0 = rowSize, $t1 = matrixSize, $t2 = board[i][j], $t3 = newBoard[i][j]

	lw $s1, N	# Loading N

	li $s0, 0	# int i = 0

	forRowSize:	# Going through the X coordinates
		bge $s0, $s1, endForRowSize	# i < N condition

		li $s2, 0	# int j = 0
		forColumnSize:	# Going through the Y coordinates
			bge $s2, $s1, endForColumnSize	# j < N condition

			# Calculating matrixSize for [i][j]
			mul $t0, $s0, $s1	# rowSize = rowSize * N
			addu $t1, $t0, $s2	# matrixSize = rowSize + column
			
			lb $t3, newBoard($t1)	# Loading newBoard[i][j]

			sb $t3, board($t1)	# board[i][j] = newBoard[i][j]
			ifDead:
				lb $t2, board($t1)	# Loading board[i][j]

				bnez $t2, elseAlive	# board[i][j] == 0 condition

				li $v0, 4	# putchar('.')
				la $a0, dot
				syscall

				j endIfDead
			elseAlive:
				li $v0, 4	# putchar('#')
				la $a0, hashtag
				syscall
			endIfDead:

			addi $s2, $s2, 1	# j++
			j forColumnSize
		endForColumnSize:

		li $v0, 4	# putchar('\n')
		la $a0, newLine
		syscall

		addi $s0, $s0, 1	# i++
		j forRowSize
	endForRowSize:

	# Remove stack frame
	lw $s2, -16($fp)	# Restore $s2
	lw $s1, -12($fp)	# Restore $s1
	lw $s0, -8($fp)	# Restore $s0
	lw $ra, -4($fp)	# Restore $ra
	la $sp, 4($fp)	# Restore $sp
	lw $fp, ($fp)	# Restore $fp

	jr $ra	# Returning
