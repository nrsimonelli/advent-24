import * as fs from 'fs'
import path from 'path'

const data = fs.readFileSync(path.resolve(__dirname, './input.txt'), 'utf-8')

const firstList: number[] = []
const secondList: number[] = []

data.split('\n').forEach((line) => {
  const [firstNumber, secondNumber] = line.split(/\s+/).map(Number)
  if (!isNaN(firstNumber) && !isNaN(secondNumber)) {
    firstList.push(firstNumber)
    secondList.push(secondNumber)
  }
})

const distanceBetweenPointsList = (listOne: number[], listTwo: number[]) => {
  const result: number[] = []
  for (let i = 0; i < listOne.length; i++) {
    result.push(Math.abs(listOne[i] - listTwo[i]))
  }

  console.log(result)
  const sumOfResult = result.reduce((acc, current) => acc + current, 0)
  console.log(`Sum of result: ${sumOfResult}`)

  return sumOfResult
}

const multiplyValuesByKeys = (arg: { [key: string]: number }) => {
  let sum = 0
  for (const [key, value] of Object.entries(arg)) {
    sum += Number(key) * value
  }
  console.log(sum)
  return sum
}

const listKeyMap = (listOne: number[], listTwo: number[]) => {
  const countMap = new Map<number, number>()
  listTwo.forEach((num) => {
    countMap.set(num, (countMap.get(num) || 0) + 1)
  })
  const keyMap = listOne.reduce((acc, current) => {
    if (!acc[current]) {
      acc[current] =
        typeof countMap.get(current) === 'number' ? countMap.get(current) : 0
    }

    return acc
  }, {})

  return multiplyValuesByKeys(keyMap)
}

listKeyMap(firstList, secondList)
