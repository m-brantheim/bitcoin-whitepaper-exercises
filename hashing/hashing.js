"use strict"

const crypto = require("crypto")

// The Power of a Smile
// by Tupac Shakur
const poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
]

const Blockchain = {
	blocks: [],
}

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
})

const blockHash = block => {
	return crypto.createHash("sha256").update(
		block
	).digest("hex")
}

const createBlock = (text, nrOfBlocks, prevHash) => {
	const newBlock = {
		index: nrOfBlocks,
		prevHash,
		data: text,
		timestamp: Date.now(),
		hash: ""
	}
	newBlock.hash = blockHash(JSON.stringify(newBlock))
	return newBlock
}

const addPoem = (poem, blocks) => {
	for (let line of poem) {
		const prevHash = blocks.at(-1).hash
		const block = createBlock(line, blocks.length, prevHash)
		blocks.push(block)
	}
}

addPoem(poem, Blockchain.blocks)

console.log(Blockchain.blocks)

const isEmptyString = text => !text || !typeof(text) === 'string' || text.length == 0

const getBlockHash = block => {
	const blockCopy = { ...block }
	blockCopy.hash = ""
	return blockHash(JSON.stringify(blockCopy))
}

const verifyChain = blocks => {
	blocks.forEach(block => {
		const {
			data,
			hash,
			prevHash,
			index
		} = block

		const isValidHash = getBlockHash(block) === hash
		const prevBlock = blocks[index - 1]
		const isValidPrevHash = getBlockHash(prevBlock) === hash
		
		if(isEmptyString(data))
			return false
		if(!Number.isInteger(index))
			return false
		if(hash === "000000" && index !== 0)
			return false
		if(isEmptyString(prevHash))
			return false
		if(!isValidHash)
			return false
		if(!isValidPrevHash)
			return false
	})
	return true
} 

console.log(`Blockchain is valid: ${verifyChain(Blockchain.blocks)}`);


// **********************************
