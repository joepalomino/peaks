function testCond() {
  let weird = 'baz'
  let options = ['foo', 'bar', 'baz']

  return options.includes(weird) && weird
}


console.log(testCond());
