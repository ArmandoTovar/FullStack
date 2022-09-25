const listHelper = require('../utils/list_helper')

test('dummpy return one',()=>{

    expect(listHelper.dummy([])).toBe(1)
})