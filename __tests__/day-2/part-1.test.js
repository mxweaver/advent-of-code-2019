const {
  fix,
  run,
  step,
  INSTRUCTION_ADD,
  INSTRUCTION_MULTIPLY,
  INSTRUCTION_HALT,
  STATE_DEFAULT,
  STATE_SEEK_ADD_SOURCE_1,
  STATE_SEEK_ADD_SOURCE_2,
  STATE_SEEK_ADD_DESTINATION,
  STATE_SEEK_MULTIPLY_SOURCE_1,
  STATE_SEEK_MULTIPLY_SOURCE_2,
  STATE_SEEK_MULTIPLY_DESTINATION,
  STATE_HALT,
} = require('../../day-2/part-1');

describe('fix', () => {
  it('returns a program', () => {
    expect.assertions(1);
    expect(fix([0, 0, 0])).toStrictEqual(expect.any(Array));
  });

  it('sets the instruction at position 1 to 12', () => {
    expect.assertions(1);

    expect(fix([0, 0, 0])[1]).toStrictEqual(12);
  });

  it('sets the instruction at position 2 to 2', () => {
    expect.assertions(1);

    expect(fix([0, 0, 0])[2]).toStrictEqual(2);
  });
});

describe('run', () => {
  it('returns a program', () => {
    expect.assertions(1);
    expect(run([0])).toStrictEqual(expect.any(Array));
  });

  it('adds properly', () => {
    expect.assertions(1);

    const program = [
      INSTRUCTION_ADD,
      1,
      1,
      1,
    ];

    const result = [
      INSTRUCTION_ADD,
      2,
      1,
      1,
    ];

    expect(run(program)).toStrictEqual(result);
  });

  it('multiplies properly', () => {
    expect.assertions(1);

    const program = [
      INSTRUCTION_MULTIPLY,
      2,
      2,
      2,
    ];

    const result = [
      INSTRUCTION_MULTIPLY,
      2,
      4,
      2,
    ];

    expect(run(program)).toStrictEqual(result);
  });

  it('halts properly', () => {
    expect.assertions(1);

    const program = [
      INSTRUCTION_ADD,
      1,
      1,
      1,
      INSTRUCTION_HALT,
      INSTRUCTION_MULTIPLY,
      2,
      2,
      2,
    ];

    const result = [
      INSTRUCTION_ADD,
      2,
      1,
      1,
      INSTRUCTION_HALT,
      INSTRUCTION_MULTIPLY,
      2,
      2,
      2,
    ];

    expect(run(program)).toStrictEqual(result);
  });
});

function instructionName(instruction) {
  switch (instruction) {
    case INSTRUCTION_ADD: return 'INSTRUCTION_ADD';
    case INSTRUCTION_MULTIPLY: return 'INSTRUCTION_MULTIPLY';
    case INSTRUCTION_HALT: return 'INSTRUCTION_HALT';
    default: return instruction.toString();
  }
}

describe('step', () => {
  [
    [STATE_DEFAULT, INSTRUCTION_ADD, STATE_SEEK_ADD_SOURCE_1],
    [STATE_DEFAULT, INSTRUCTION_MULTIPLY, STATE_SEEK_MULTIPLY_SOURCE_1],
    [STATE_DEFAULT, INSTRUCTION_HALT, STATE_HALT],
    [STATE_DEFAULT, -1, STATE_DEFAULT],
    [STATE_SEEK_ADD_SOURCE_1, -1, STATE_SEEK_ADD_SOURCE_2],
    [STATE_SEEK_ADD_SOURCE_2, -1, STATE_SEEK_ADD_DESTINATION],
    [STATE_SEEK_ADD_DESTINATION, -1, STATE_DEFAULT],
    [STATE_SEEK_MULTIPLY_SOURCE_1, -1, STATE_SEEK_MULTIPLY_SOURCE_2],
    [STATE_SEEK_MULTIPLY_SOURCE_2, -1, STATE_SEEK_MULTIPLY_DESTINATION],
    [STATE_SEEK_MULTIPLY_DESTINATION, -1, STATE_DEFAULT],
    [STATE_HALT, -1, STATE_HALT],
  ].forEach(([state, instruction, result]) => {
    it(`steps from ${state.toString()} to ${result.toString()} when given ${instructionName(instruction)}`, () => {
      expect.assertions(1);

      expect(step(state, instruction)).toStrictEqual(result);
    });
  });
});
