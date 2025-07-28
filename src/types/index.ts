export interface User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  phone: string | null;
  date_of_birth: string | null;
  annual_salary: number | null;
  current_pension_value: number | null;
  target_retirement_age: number | null;
  created_at: string;
  updated_at: string;
}

export interface Asset {
  id: string;
  member_id: string;
  category_id: string;
  name: string;
  value: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Liability {
  id: string;
  member_id: string;
  category_id: string;
  name: string;
  value: number;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  type: 'asset' | 'liability';
  description?: string;
}

export interface CalculatorResult {
  currentAge: number;
  retirementAge: number;
  annualSalary: number;
  existingPensionValue: number;
  targetIncome: number;
  projectedIncome: number;
  shortfall: number;
  monthlyTopUpRequired: number;
  totalRequired: number;
}

export interface APFRegistration {
  id: string;
  member_id: string;
  annual_income: number;
  existing_pension_value: number;
  target_retirement_age: number;
  shortfall_amount: number;
  apf_funding_required: number;
  status: 'draft' | 'submitted' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}
