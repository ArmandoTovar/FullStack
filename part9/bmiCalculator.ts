function calculateBmi(height: number, mass: number): string {
  const x = (mass * 100) / height;
  if (x > 40) return 'Obese (Class III)';
  if (x < 39.9 && x > 35.6) return 'Obese (Class II)';
  if (x < 35.5 && x > 30.0) return 'Obese (Class I)';
  if (x < 29.9 && x > 25.0) return 'Overweight (Pre-obese)';
  if (x < 24.9 && x > 18.5) return 'Normal range';
  if (x < 18.4 && x > 17.0) return 'Underweight (Mild thinness)';
  if (x < 16.9 && x > 16.0) return 'Underweight (Moderate thinness)';

  return 'Underweight (Severe thinness)';
}
interface correct {
  weigth: number
  height: number
  bmi: string
}
interface incorrect {
  error: string
}
export interface input {
  height: string
  weight: string
}
type res = correct | incorrect;
function calculador(params: input): res {
  try {
    if (typeof params !== 'object') {
      throw new Error('input not is object');
    }
    if (!params.height || !params.weight) {
      throw new Error('missing parameter');
    }

    if (isNaN(Number(params.height)) || isNaN(Number(params.weight))) {
      throw new Error('bad formatted');
    }
    const weigth = Number(params.weight);
    const height = Number(params.height);
    return {
      weigth,
      height,
      bmi: calculateBmi(height, weigth),
    };
  } catch (e) {
    console.log(e);
 if(e instanceof Error)
  return { error: e.message };

  return { error:'e'};
  }
}

export default calculador;
