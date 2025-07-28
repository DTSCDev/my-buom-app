// Core pension calculation parameters
export const PENSION_PARAMETERS = {
  STATE_PENSION_ANNUAL: 11502, // 2024/25 rate
  RETIREMENT_AGE: 67,
  REPLACEMENT_RATIO: 0.5, // 50% of salary needed in retirement
  ANNUAL_INFLATION_RATE: 0.025, // 2.5%
  INVESTMENT_GROWTH_RATE: 0.045, // 4.5% net growth
  DRAWDOWN_RATE: 0.035, // 3.5% annual drawdown
} as const;

/**
 * Calculate the target retirement income (50% of current salary, inflated to retirement)
 */
export function calculateTargetRetirementIncome(
  currentSalary: number,
  yearsToRetirement: number
): number {
  const targetIncomeToday = currentSalary * PENSION_PARAMETERS.REPLACEMENT_RATIO;
  return targetIncomeToday * Math.pow(1 + PENSION_PARAMETERS.ANNUAL_INFLATION_RATE, yearsToRetirement);
}

/**
 * Calculate state pension value at retirement (with inflation)
 */
export function calculateStatePensionAtRetirement(yearsToRetirement: number): number {
  return PENSION_PARAMETERS.STATE_PENSION_ANNUAL * 
    Math.pow(1 + PENSION_PARAMETERS.ANNUAL_INFLATION_RATE, yearsToRetirement);
}

/**
 * Project existing pension value to retirement using compound growth
 */
export function projectPensionValue(
  currentValue: number,
  yearsToRetirement: number
): number {
  return currentValue * Math.pow(1 + PENSION_PARAMETERS.INVESTMENT_GROWTH_RATE, yearsToRetirement);
}

/**
 * Calculate annual income from a pension pot using 3.5% drawdown
 */
export function calculateAnnualIncomeFromPot(pensionPot: number): number {
  return pensionPot * PENSION_PARAMETERS.DRAWDOWN_RATE;
}

/**
 * Calculate the capital required to generate a specific annual income
 */
export function calculateCapitalRequired(annualIncome: number): number {
  return annualIncome / PENSION_PARAMETERS.DRAWDOWN_RATE;
}

/**
 * Calculate monthly savings required to meet a future capital target
 */
export function calculateMonthlySavingsRequired(
  targetCapital: number,
  yearsToSave: number
): number {
  const monthlyRate = PENSION_PARAMETERS.INVESTMENT_GROWTH_RATE / 12;
  const totalMonths = yearsToSave * 12;
  
  if (monthlyRate === 0) {
    return targetCapital / totalMonths;
  }
  
  return (targetCapital * monthlyRate) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
}

/**
 * Main calculator function - returns comprehensive retirement analysis
 */
export function calculateRetirementShortfall(
  currentAge: number,
  currentSalary: number,
  existingPensionValue: number = 0,
  targetRetirementAge: number = PENSION_PARAMETERS.RETIREMENT_AGE
) {
  const yearsToRetirement = targetRetirementAge - currentAge;
  
  if (yearsToRetirement <= 0) {
    throw new Error('Target retirement age must be in the future');
  }
  
  // Calculate target income at retirement
  const targetIncomeAtRetirement = calculateTargetRetirementIncome(currentSalary, yearsToRetirement);
  
  // Calculate state pension at retirement
  const statePensionAtRetirement = calculateStatePensionAtRetirement(yearsToRetirement);
  
  // Project existing pension to retirement
  const projectedExistingPension = projectPensionValue(existingPensionValue, yearsToRetirement);
  
  // Calculate income from existing pension
  const incomeFromExistingPension = calculateAnnualIncomeFromPot(projectedExistingPension);
  
  // Calculate total projected income
  const totalProjectedIncome = statePensionAtRetirement + incomeFromExistingPension;
  
  // Calculate shortfall
  const incomeShortfall = Math.max(0, targetIncomeAtRetirement - totalProjectedIncome);
  
  // Calculate capital required to fill shortfall
  const capitalShortfall = calculateCapitalRequired(incomeShortfall);
  
  // Calculate monthly savings required
  const monthlySavingsRequired = incomeShortfall > 0 
    ? calculateMonthlySavingsRequired(capitalShortfall, yearsToRetirement)
    : 0;
  
  return {
    currentAge,
    targetRetirementAge,
    yearsToRetirement,
    currentSalary,
    existingPensionValue,
    // Targets
    targetIncomeAtRetirement,
    statePensionAtRetirement,
    // Projections
    projectedExistingPension,
    incomeFromExistingPension,
    totalProjectedIncome,
    // Shortfalls
    incomeShortfall,
    capitalShortfall,
    monthlySavingsRequired,
    // Progress indicators
    progressPercentage: Math.min((totalProjectedIncome / targetIncomeAtRetirement) * 100, 100),
    isOnTrack: incomeShortfall === 0,
  };
}
