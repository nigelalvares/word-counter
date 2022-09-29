const { readFileSync } = require('fs');

const mockDummyText = 'This Test is a test file';
jest.mock('fs', () => ({
  readFileSync: jest.fn().mockImplementation(() => mockDummyText),
}));

jest.spyOn(console, 'log').mockImplementation(() => {});
jest.spyOn(console, 'debug').mockImplementation(() => {});

const counter = require('./counter');

describe('Word counter', () => {
  it('counts words with case sensitivity successfully', () => {
    const response = counter.count('somePath', true, false);
    const newResp = response.map((obj) => ({ [obj.word]: obj.count }));
    expect(newResp).toEqual(
      [{ This: 1 }, { Test: 1 }, { is: 1 }, { a: 1 }, { test: 1 }, { file: 1 }],
    );
    expect(console.debug).not.toHaveBeenCalled();
  });

  it('counts words without case sensitivity successfully', () => {
    const response = counter.count('somePath', false, false);
    const newResp = response.map((obj) => ({ [obj.word]: obj.count }));
    expect(newResp).toEqual([{ test: 2 }, { this: 1 }, { is: 1 }, { a: 1 }, { file: 1 }]);
    expect(console.debug).not.toHaveBeenCalled();
  });

  it('debug messages are called', () => {
    counter.count('somePath', false, true);
    expect(console.debug).toHaveBeenCalled();
  });

  it('stops execution if file is not found', () => {
    readFileSync.mockImplementation(() => { throw new Error('no such file or directory'); });
    expect(() => counter.count('somePath', false, true)).toThrow('Path \'somePath\' does not exist');
  });
});
