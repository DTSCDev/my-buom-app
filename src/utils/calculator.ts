// Pension calculation utilities
export interface PensionCalculationParams {
  retirementAge: number;
  pensionIncomeTarget: number;
  salaryInflation: number;
  pensionIncomeInflation: number;
  growthRateAccumulation: number;
  growthRateDrawdown: number;
  taxFreeCash: number;
  legacyPlan: number;
}

export const DEFAULT_PENSION_PARAMETERS: PensionCalculationParams = {
  retirementAge: 67,
  pensionIncomeTarget: 0.6, // 60% of salary
  salaryInflation: 0.025, // 2.5%
  pensionIncomeInflation: 0.025, // 2.5%
  growthRateAccumulation: 0.05, // 5%
  growthRateDrawdown: 0.04, // 4%
  taxFreeCash: 0.25, // 25%
  legacyPlan: 0.5, // 50%
};

// Calculate age from date of birth
export function calculateAge(dateOfBirth: Date): { years: number; months: number } {
  const today = new Date();
  let years = today.getFullYear() - dateOfBirth.getFullYear();
  let months = today.getMonth() - dateOfBirth.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (today.getDate() < dateOfBirth.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  return { years, months };
}

// Calculate years until pension
export function calculateYearsUntilPension(dateOfBirth: Date): { years: number; months: number } {
  const pensionDate = new Date(dateOfBirth);
  pensionDate.setFullYear(pensionDate.getFullYear() + DEFAULT_PENSION_PARAMETERS.retirementAge);
  
  const today = new Date();
  let years = pensionDate.getFullYear() - today.getFullYear();
  let months = pensionDate.getMonth() - today.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (pensionDate.getDate() < today.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  return { years: Math.max(0, years), months: Math.max(0, months) };
}

// Calculate days until pension
export function calculateDaysUntilPension(dateOfBirth: Date): number {
  const pensionDate = new Date(dateOfBirth);
  pensionDate.setFullYear(pensionDate.getFullYear() + DEFAULT_PENSION_PARAMETERS.retirementAge);
  
  const today = new Date();
  const diffTime = pensionDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return Math.max(0, diffDays);
}

// Format years and months
export function formatYearsAndMonths(yearsUntilPension: { years: number; months: number }): string {
  const { years, months } = yearsUntilPension;
  
  if (years === 0 && months === 0) {
    return "Retirement age reached";
  }
  
  if (years === 0) {
    return `${months} month${months !== 1 ? 's' : ''}`;
  }
  
  if (months === 0) {
    return `${years} year${years !== 1 ? 's' : ''}`;
  }
  
  return `${years} year${years !== 1 ? 's' : ''} and ${months} month${months !== 1 ? 's' : ''}`;
}

// Calculate existing pension value based on age and salary
export function calculateExistingPensionValue(annualSalary: number, currentAge: number): { fundValue: number; totalContributions: number } {
  const workingYears = Math.max(0, currentAge - 21); // Assume work started at 21
  const monthlyContribution = (annualSalary * 0.08) / 12; // 8% total contribution
  const monthsWorked = workingYears * 12;
  
  // Simple compound growth calculation
  const monthlyGrowthRate = DEFAULT_PENSION_PARAMETERS.growthRateAccumulation / 12;
  let fundValue = 0;
  
  // Calculate future value of monthly contributions
  if (monthlyGrowthRate > 0) {
    fundValue = monthlyContribution * (Math.pow(1 + monthlyGrowthRate, monthsWorked) - 1) / monthlyGrowthRate;
  } else {
    fundValue = monthlyContribution * monthsWorked;
  }
  
  const totalContributions = monthlyContribution * monthsWorked;
  
  return { fundValue, totalContributions };
}

// Calculate monthly Auto Enrolment contribution
export function calculateMonthlyAEContribution(annualSalary: number): number {
  const pensionableEarnings = Math.max(0, annualSalary - 6240); // Above lower earnings limit
  const cappedEarnings = Math.min(pensionableEarnings, 50270 - 6240); // Below upper earnings limit
  return (cappedEarnings * 0.08) / 12; // 8% total (5% employee + 3% employer)
}

// Calculate target income
export function calculateTargetIncome(annualSalary: number): number {
  return annualSalary * DEFAULT_PENSION_PARAMETERS.pensionIncomeTarget;
}

// Calculate required capital for retirement
export function calculateRequiredCapital(targetIncome: number): number {
  // Using 4% withdrawal rule (25x annual income)
  return targetIncome * 25;
}

// Calculate pension shortfall
export function calculatePensionShortfall(
  currentAge: number,
  annualSalary: number,
  existingPensionValue: number
): {
  targetIncome: number;
  requiredCapital: number;
  projectedPensionValue: number;
  shortfall: number;
  monthlyFundingCost: number;
} {
  const yearsToRetirement = DEFAULT_PENSION_PARAMETERS.retirementAge - currentAge;
  const monthsToRetirement = yearsToRetirement * 12;
  
  // Calculate target income
  const targetIncome = calculateTargetIncome(annualSalary);
  
  // Calculate required capital
  const requiredCapital = calculateRequiredCapital(targetIncome);
  
  // Project existing pension value
  const monthlyGrowthRate = DEFAULT_PENSION_PARAMETERS.growthRateAccumulation / 12;
  const projectedExistingValue = existingPensionValue * Math.pow(1 + monthlyGrowthRate, monthsToRetirement);
  
  // Project future contributions from Auto Enrolment
  const monthlyAE = calculateMonthlyAEContribution(annualSalary);
  let projectedAEValue = 0;
  
  if (monthlyGrowthRate > 0) {
    projectedAEValue = monthlyAE * (Math.pow(1 + monthlyGrowthRate, monthsToRetirement) - 1) / monthlyGrowthRate;
  } else {
    projectedAEValue = monthlyAE * monthsToRetirement;
  }
  
  const projectedPensionValue = projectedExistingValue + projectedAEValue;
  const shortfall = Math.max(0, requiredCapital - projectedPensionValue);
  
  // Calculate monthly funding cost to cover shortfall
  let monthlyFundingCost = 0;
  if (shortfall > 0 && monthsToRetirement > 0) {
    if (monthlyGrowthRate > 0) {
      monthlyFundingCost = shortfall * monthlyGrowthRate / (Math.pow(1 + monthlyGrowthRate, monthsToRetirement) - 1);
    } else {
      monthlyFundingCost = shortfall / monthsToRetirement;
    }
  }
  
  return {
    targetIncome,
    requiredCapital,
    projectedPensionValue,
    shortfall,
    monthlyFundingCost
  };
}
