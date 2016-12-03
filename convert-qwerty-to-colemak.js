#!/usr/bin/env node

const read = (...argv) =>
  require('fs').readFileSync(...argv).toString()

const write = (...argv) =>
  require('fs').writeFileSync(...argv)

const log = (i) => console.log(i)

function postfixFileName (path, postfix) {
  const parse = require('path').parse
  const format = require('path').format

  const parsed = parse(path)
  return format({
    root: parsed.root,
    dir: parsed.dir,
    name: `${parsed.name}-${postfix}`,
    ext: parsed.ext
  })
}

function QwertyToColemak (qwe) {
  /**
   * map a qwerty string to colemak
   * @return {string}
   */
  function mapQwerty2Colemak (q) {
    const q2cTable = new Map([
      ['a', 'a'],
      ['b', 'b'],
      ['c', 'c'],
      ['d', 's'],
      ['e', 'f'],
      ['f', 't'],
      ['g', 'd'],
      ['h', 'h'],
      ['i', 'u'],
      ['j', 'n'],
      ['k', 'e'],
      ['l', 'i'],
      ['m', 'm'],
      ['n', 'k'],
      ['o', 'y'],
      ['p', ';'],
      ['q', 'q'],
      ['r', 'p'],
      ['s', 'r'],
      ['t', 'g'],
      ['u', 'l'],
      ['v', 'v'],
      ['w', 'w'],
      ['x', 'x'],
      ['y', 'j'],
      ['z', 'z']
    ])

    return q.split('')
      .map(c => q2cTable.get(c) || c)
      .join('')
  }

  const keyCode = 'KeyCode=abcdefghijklmnopqrstuvwxyz'
  const dataSpliter = '[Data]\n'
  const [head, body] = qwe.split(dataSpliter, 2)

  /** colemak head */
  const cHead = head.replace(keyCode, 'KeyCode=abcdefghijklmnpqrstuvwxyz;')

  /** colemak body */
  const cBody = body.split('\n')
    .map(line => {
      const L = line.split(' ')
      return [mapQwerty2Colemak(L[0]), L[1]].join(' ')
    })
    .join('\n')
  return [cHead, cBody].join('[Data]\n')
}

const usage = `
Convert a text fcitx table(generate by mb2txt) from qwerty to colemak.

Usage: ${require('path').basename(__filename)} TEXT_TABLE.txt

Then there will be TEXT_TABLE-colemak.txt
`

//* main logic
let tablePath

if (process.argv.length !== 3) {
  log('unsatisfied number of input files, exiting...')
  log(usage)
  process.exit(1)
} else {
  tablePath = process.argv[2]
}

const qwertyTable = read(tablePath)
const colemakTable = QwertyToColemak(qwertyTable)
write(postfixFileName(tablePath, `colemak`), colemakTable)
