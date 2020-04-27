const INSTRUCTION_ADD = 1;
const INSTRUCTION_MULTIPLY = 2;
const INSTRUCTION_HALT = 99;

const STATE_DEFAULT = Symbol('STATE_DEFAULT');
const STATE_SEEK_ADD_SOURCE_1 = Symbol('STATE_SEEK_ADD_SOURCE_1');
const STATE_SEEK_ADD_SOURCE_2 = Symbol('STATE_SEEK_ADD_SOURCE_2');
const STATE_SEEK_ADD_DESTINATION = Symbol('STATE_SEEK_ADD_DESTINATION');
const STATE_SEEK_MULTIPLY_SOURCE_1 = Symbol('STATE_SEEK_MULTIPLY_SOURCE_1');
const STATE_SEEK_MULTIPLY_SOURCE_2 = Symbol('STATE_SEEK_MULTIPLY_SOURCE_2');
const STATE_SEEK_MULTIPLY_DESTINATION = Symbol('STATE_SEEK_MULTIPLY_DESTINATION');
const STATE_HALT = Symbol('STATE_HALT');

function step(state, instruction) {
  switch (state) {
    case STATE_DEFAULT:
      switch (instruction) {
        case INSTRUCTION_ADD: return STATE_SEEK_ADD_SOURCE_1;
        case INSTRUCTION_MULTIPLY: return STATE_SEEK_MULTIPLY_SOURCE_1;
        case INSTRUCTION_HALT: return STATE_HALT;
        default: return state;
      }
    case STATE_SEEK_ADD_SOURCE_1: return STATE_SEEK_ADD_SOURCE_2;
    case STATE_SEEK_ADD_SOURCE_2: return STATE_SEEK_ADD_DESTINATION;
    case STATE_SEEK_ADD_DESTINATION: return STATE_DEFAULT;
    case STATE_SEEK_MULTIPLY_SOURCE_1: return STATE_SEEK_MULTIPLY_SOURCE_2;
    case STATE_SEEK_MULTIPLY_SOURCE_2: return STATE_SEEK_MULTIPLY_DESTINATION;
    case STATE_SEEK_MULTIPLY_DESTINATION: return STATE_DEFAULT;
    case STATE_HALT:
    default:
      return state;
  }
}

function run(program) {
  let state = STATE_DEFAULT;
  let source1 = 0;
  let source2 = 0;

  const result = [...program];

  result.forEach((instruction) => {
    switch (state) {
      case STATE_SEEK_ADD_SOURCE_1:
      case STATE_SEEK_MULTIPLY_SOURCE_1:
        source1 = instruction;
        break;
      case STATE_SEEK_ADD_SOURCE_2:
      case STATE_SEEK_MULTIPLY_SOURCE_2:
        source2 = instruction;
        break;
      case STATE_SEEK_ADD_DESTINATION:
        result[instruction] = result[source1] + result[source2];
        break;
      case STATE_SEEK_MULTIPLY_DESTINATION:
        result[instruction] = result[source1] * result[source2];
        break;
      case STATE_HALT:
      case STATE_DEFAULT:
      default:
    }

    state = step(state, instruction);
  });

  return result;
}

function fix(program) {
  const result = [...program];

  result[1] = 12;
  result[2] = 2;

  return result;
}

module.exports = {
  run,
  fix,
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
};
