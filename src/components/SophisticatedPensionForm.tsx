import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import { 
  calculateAge, 
  calculateDaysUntilPension, 
  calculateYearsUntilPension, 
  formatYearsAndMonths,
  calculateExistingPensionValue,
  calculateMonthlyAEContribution,
  calculatePensionShortfall,
  formatNumber
} from '@/utils/calculator';

export interface PensionCalculationResults {
  currentAge: number;
  ageYears: number;
  ageMonths: number;
  daysUntilPension: number;
  yearsUntilPensionFormatted: string;
  annualSalary: number;
  existingPensionValue: number;
  yearsUntilPension: number | { years: number; months: number };
  targetIncome: number;
  existingPlanIncome: number;
  apfTargetIncome: number;
  requiredIncome: number;
  requiredIncomeAfterInflation: number;
  finalSalaryIncome?: number;
  otherIncome?: number;
  monthlyFundingCost?: number;
  requiredCapital: number;
  currentCapitalShortfall: number;
  proposedAPFFunding: number;
  proposedISAMonthlyValue: number;
  totalProjectedAssets: number;
  useCustomContributions?: boolean;
  customEmployeeContribution?: number;
  customEmployerContribution?: number;
}

interface SophisticatedPensionFormProps {
  onCalculationComplete: (results: PensionCalculationResults) => void;
}

// Helper function to calculate default DOB for a 42-year-old
const getDefaultDateOfBirth = (): string => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  // Calculate birth year for a 42-year-old in current year
  const birthYear = currentYear - 42;
  
  const calculatedDOB = `${birthYear}-${month}-${day}`;
  
  console.log(`Default DOB calculation: ${calculatedDOB} (42 years old in ${currentYear})`);
  
  return calculatedDOB;
};

const SophisticatedPensionForm: React.FC<SophisticatedPensionFormProps> = ({ onCalculationComplete }) => {
  // Form state - FIXED: Default to Auto Calculate and use forced date calculation
  const [dateOfBirth, setDateOfBirth] = useState(getDefaultDateOfBirth()); // FIXED: Now uses 1983
  const [salaryValue, setSalaryValue] = useState(60000);
  const [isAnnualSalary, setIsAnnualSalary] = useState(true);

  // Handle salary toggle conversion
  const handleSalaryToggle = (newIsAnnual: boolean) => {
    if (newIsAnnual !== isAnnualSalary) {
      if (newIsAnnual) {
        // Converting from Monthly to Annual: multiply by 12
        setSalaryValue(prev => Math.round(prev * 12));
      } else {
        // Converting from Annual to Monthly: divide by 12
        setSalaryValue(prev => Math.round(prev / 12));
      }
      setIsAnnualSalary(newIsAnnual);
    }
  };
  const [existingPensionValue, setExistingPensionValue] = useState(120000);
  const [autoCalculatePension, setAutoCalculatePension] = useState(true); // FIXED: Changed to true
  const [finalSalaryIncome, setFinalSalaryIncome] = useState(0);
  const [otherIncome, setOtherIncome] = useState(0);
  const [isCalculating, setIsCalculating] = useState(false);

  // NEW: Custom contributions state
  const [useCustomContributions, setUseCustomContributions] = useState(false);
  const [customEmployeeContribution, setCustomEmployeeContribution] = useState(200);
  const [customEmployerContribution, setCustomEmployerContribution] = useState(150);

  // Ref for scrolling to results
  const resultsRef = useRef<HTMLDivElement>(null);

  // Real-time calculation state
  const [estimates, setEstimates] = useState({
    projectedPensionValue: 0,
    monthlyContributions: 0,
    targetIncome: 0,
    capitalShortfall: 0
  });

  // Calculate real-time estimates
  useEffect(() => {
    if (dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const ageCalculation = calculateAge(birthDate);
      const currentAge = ageCalculation.years;
      const annualSalary = isAnnualSalary ? salaryValue : salaryValue * 12;
      
      // Calculate basic estimates - use custom contributions if enabled
      const monthlyAEContribution = useCustomContributions 
        ? (customEmployeeContribution + customEmployerContribution)
        : calculateMonthlyAEContribution(annualSalary);
      
      const calculations = calculatePensionShortfall(currentAge, annualSalary, existingPensionValue);
      
      setEstimates({
        projectedPensionValue: calculations.projectedPensionValue,
        monthlyContributions: monthlyAEContribution,
        targetIncome: calculations.targetIncome,
        capitalShortfall: calculations.shortfall
      });
    }
  }, [dateOfBirth, salaryValue, isAnnualSalary, existingPensionValue, useCustomContributions, customEmployeeContribution, customEmployerContribution]);

  // FIXED: Auto-calculate pension value using corrected existing pension calculation
  useEffect(() => {
    if (autoCalculatePension && dateOfBirth) {
      const birthDate = new Date(dateOfBirth);
      const ageCalculation = calculateAge(birthDate);
      const currentAge = ageCalculation.years;
      const annualSalary = isAnnualSalary ? salaryValue : salaryValue * 12;
      
      // Use the corrected existing pension calculation
      const { fundValue } = calculateExistingPensionValue(annualSalary, currentAge);
      setExistingPensionValue(Math.round(fundValue));
      
      console.log('=== FIXED AUTO-CALCULATE PENSION ===');
      console.log(`Current age: ${currentAge}, Annual salary: £${annualSalary.toLocaleString()}`);
      console.log(`Corrected existing pension value: £${Math.round(fundValue).toLocaleString()}`);
    }
  }, [autoCalculatePension, dateOfBirth, salaryValue, isAnnualSalary]);

  const handleCalculate = () => {
    setIsCalculating(true);
    
    try {
      const birthDate = new Date(dateOfBirth);
      const ageCalculation = calculateAge(birthDate);
      const currentAge = ageCalculation.years;
      const yearsUntilPensionObj = calculateYearsUntilPension(birthDate);
      const yearsUntilPension = yearsUntilPensionObj.years + (yearsUntilPensionObj.months / 12);
      const daysUntilPension = calculateDaysUntilPension(birthDate);
      const yearsUntilPensionFormatted = formatYearsAndMonths(yearsUntilPensionObj);
      const annualSalary = isAnnualSalary ? salaryValue : salaryValue * 12;

      console.log('=== SOPHISTICATED FORM CALCULATION WITH CUSTOM CONTRIBUTIONS ===');
      console.log(`Current age: ${currentAge}, Years to retirement: ${yearsUntilPension}`);
      console.log(`Annual salary: £${annualSalary.toLocaleString()}`);
      console.log(`Existing pension value: £${existingPensionValue.toLocaleString()}`);
      console.log(`Use custom contributions: ${useCustomContributions}`);
      if (useCustomContributions) {
        console.log(`Custom employee contribution: £${customEmployeeContribution}/month`);
        console.log(`Custom employer contribution: £${customEmployerContribution}/month`);
      }

      // Calculate pension projections
      const calculations = calculatePensionShortfall(currentAge, annualSalary, existingPensionValue);

      const results: PensionCalculationResults = {
        currentAge,
        ageYears: ageCalculation.years,
        ageMonths: ageCalculation.months,
        daysUntilPension,
        yearsUntilPensionFormatted,
        annualSalary,
        existingPensionValue,
        yearsUntilPension: yearsUntilPensionObj,
        targetIncome: calculations.targetIncome,
        existingPlanIncome: calculations.projectedPensionValue * 0.04, // 4% withdrawal rate
        apfTargetIncome: calculations.targetIncome,
        requiredIncome: calculations.targetIncome,
        requiredIncomeAfterInflation: calculations.targetIncome * Math.pow(1.025, yearsUntilPension), // 2.5% inflation
        finalSalaryIncome,
        otherIncome,
        monthlyFundingCost: calculations.monthlyFundingCost,
        requiredCapital: calculations.requiredCapital,
        currentCapitalShortfall: calculations.shortfall,
        proposedAPFFunding: calculations.monthlyFundingCost * 0.7, // 70% APF
        proposedISAMonthlyValue: calculations.monthlyFundingCost * 0.3, // 30% ISA
        totalProjectedAssets: calculations.projectedPensionValue,
        // NEW: Include custom contribution settings
        useCustomContributions,
        customEmployeeContribution: useCustomContributions ? customEmployeeContribution : undefined,
        customEmployerContribution: useCustomContributions ? customEmployerContribution : undefined
      };

      console.log('=== SOPHISTICATED FORM RESULTS ===');
      console.log(`Target Income: £${results.targetIncome.toLocaleString()}`);
      console.log(`Existing Plan Income: £${results.existingPlanIncome.toLocaleString()}`);
      console.log(`APF Target Income: £${results.apfTargetIncome.toLocaleString()}`);
      console.log(`🚨 Monthly Funding Cost: £${results.monthlyFundingCost?.toLocaleString()}`);

      onCalculationComplete(results);
      
      // FIXED: Auto-scroll to results section after calculation
      setTimeout(() => {
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      console.error('Error in sophisticated pension calculation:', error);
    } finally {
      setIsCalculating(false);
    }
  };

  const displaySalary = isAnnualSalary ? salaryValue : salaryValue * 12;

  return (
    <>
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            Enter Your Basic Details
          </CardTitle>
          <CardDescription className="flex items-center justify-center gap-2 text-blue-600">
            <span>Want to know how we will use this information?</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="h-4 w-4 cursor-pointer hover:text-blue-800" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs p-4">
                  <div className="space-y-2 text-sm">
                    <p className="font-semibold">How we use your information:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Calculate your projected pension shortfall</li>
                      <li>Determine monthly funding requirements</li>
                      <li>Assess affordability and eligibility</li>
                      <li>Provide personalized retirement planning advice</li>
                    </ul>
                    <p className="text-xs text-muted-foreground mt-2">
                      All calculations are performed locally. Your data is not shared with third parties.
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Date of Birth */}
          <div className="space-y-2 relative">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            />
            <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
              SFM-001
            </div>
          </div>

          {/* Gross Salary */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="salaryValue">Gross Salary</Label>
              <div className="flex items-center gap-4">
                <span className={!isAnnualSalary ? 'text-blue-600 font-medium' : 'text-gray-400'}>Monthly</span>
                <Switch
                  checked={isAnnualSalary}
                  onCheckedChange={handleSalaryToggle}
                />
                <span className={isAnnualSalary ? 'text-blue-600 font-medium' : 'text-gray-400'}>Annual</span>
              </div>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
              <Input
                id="salaryValue"
                type="number"
                value={salaryValue}
                onChange={(e) => setSalaryValue(Number(e.target.value))}
                className="pl-8"
                placeholder={isAnnualSalary ? "60000" : "5000"}
              />
              <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                SFM-002
              </div>
            </div>
          </div>

          {/* Existing Pension Fund Value */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="existingPensionValue">Existing Pension Fund Value</Label>
              <div className="flex items-center gap-4">
                <span className={!autoCalculatePension ? 'text-blue-600 font-medium' : 'text-gray-400'}>User Input</span>
                <Switch
                  checked={autoCalculatePension}
                  onCheckedChange={setAutoCalculatePension}
                />
                <span className={autoCalculatePension ? 'text-blue-600 font-medium' : 'text-gray-400'}>Auto Calculate</span>
              </div>
            </div>
            
            {autoCalculatePension ? (
              <div className="space-y-2 p-4 bg-blue-50 rounded-md relative">
                <p className="text-sm text-gray-600">
                  Estimated pension value based on your age and salary: <strong>£{formatNumber(existingPensionValue)}</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Estimated total contributions paid since age 21: <strong>£{(() => {
                    if (!dateOfBirth) return '0';
                    const birthDate = new Date(dateOfBirth);
                    const currentAge = calculateAge(birthDate).years;
                    const annualSalary = isAnnualSalary ? salaryValue : salaryValue * 12;
                    try {
                      const { totalContributions } = calculateExistingPensionValue(annualSalary, currentAge);
                      return formatNumber(totalContributions);
                    } catch (error) {
                      console.error('Error calculating historical contributions:', error);
                      return '0';
                    }
                  })()}</strong>
                </p>
                <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                  SFM-003
                </div>
              </div>
            ) : (
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                <Input
                  id="existingPensionValue"
                  type="number"
                  value={existingPensionValue}
                  onChange={(e) => setExistingPensionValue(Number(e.target.value))}
                  className="pl-8"
                  placeholder="120000"
                />
                <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                  SFM-003
                </div>
              </div>
            )}
          </div>

          {/* NEW: Custom Contributions Override */}
          <div className="space-y-4 relative">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Pension Contributions</Label>
              <div className="flex items-center gap-4">
                <span className={useCustomContributions ? 'text-blue-600 font-medium' : 'text-gray-400'}>Custom</span>
                <Switch
                  checked={!useCustomContributions}
                  onCheckedChange={(checked) => setUseCustomContributions(!checked)}
                />
                <span className={!useCustomContributions ? 'text-blue-600 font-medium' : 'text-gray-400'}>Auto Enrolment</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
              SFM-025
            </div>
            
            {useCustomContributions ? (
              <div className="space-y-4 p-4 bg-green-50 rounded-md">
                <p className="text-sm text-gray-600 mb-4">
                  Enter your custom monthly pension contributions:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="customEmployeeContribution">Employee Contribution (Monthly)</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input
                        id="customEmployeeContribution"
                        type="number"
                        value={customEmployeeContribution}
                        onChange={(e) => setCustomEmployeeContribution(Number(e.target.value))}
                        className="pl-8"
                        placeholder="200"
                      />
                    </div>
                    <div className="absolute top-0 right-0 text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded border">
                      SFM-126
                    </div>
                  </div>
                  
                  <div className="relative">
                    <Label htmlFor="customEmployerContribution">Employer Contribution (Monthly)</Label>
                    <div className="relative mt-1">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input
                        id="customEmployerContribution"
                        type="number"
                        value={customEmployerContribution}
                        onChange={(e) => setCustomEmployerContribution(Number(e.target.value))}
                        className="pl-8"
                        placeholder="150"
                      />
                    </div>
                    <div className="absolute top-0 right-0 text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded border">
                      SFM-026
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">
                  Total monthly contributions: <strong>£{formatNumber(customEmployeeContribution + customEmployerContribution)}</strong>
                </p>
              </div>
            ) : (
              <div className="space-y-2 p-4 bg-blue-50 rounded-md relative">
                <p className="text-sm text-gray-600">
                  Using Auto Enrolment contributions (8% of pensionable earnings):
                </p>
                <p className="text-sm text-gray-600">
                  Estimated monthly contributions: <strong>£{formatNumber(estimates.monthlyContributions)}</strong>
                </p>
                <p className="text-sm text-gray-500">
                  Based on employee 5% + employer 3% of 85% pensionable pay
                </p>
                <div className="absolute top-2 right-2 text-xs text-gray-500 bg-gray-100 px-1 py-0.5 rounded border">
                  SFM-024
                </div>
              </div>
            )}
          </div>

          {/* Additional Income Sources */}
          <div className="space-y-4 relative">
            <Label className="text-sm font-medium">Estimated Income from Final Salary / Defined Benefits at Retirement</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
              <Input
                type="number"
                value={finalSalaryIncome}
                onChange={(e) => setFinalSalaryIncome(Number(e.target.value))}
                className="pl-8"
                placeholder="0"
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
              SFM-029
            </div>
          </div>

          <div className="space-y-4 relative">
            <Label className="text-sm font-medium">Estimated Other Income at Retirement</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
              <Input
                type="number"
                value={otherIncome}
                onChange={(e) => setOtherIncome(Number(e.target.value))}
                className="pl-8"
                placeholder="0"
              />
            </div>
            <div className="absolute top-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
              SFM-030
            </div>
          </div>

          <Button 
            onClick={handleCalculate} 
            className="w-full text-black text-lg py-6" 
            style={{ backgroundColor: '#4FF546' }} 
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#45E03F'} 
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4FF546'}
            disabled={isCalculating}
          >
            {isCalculating ? 'Calculating...' : 'Calculate Pension Forecast'}
          </Button>
        </CardContent>
      </Card>
      
      {/* Invisible div for scroll target */}
      <div ref={resultsRef} className="invisible h-0" />
    </>
  );
};

export default SophisticatedPensionForm;
