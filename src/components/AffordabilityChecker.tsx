import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PensionCalculationResults } from './SophisticatedPensionForm';
import { formatCurrency } from '@/lib/utils';

interface AffordabilityCheckerProps {
  annualSalary: number;
  monthlyFundingCost: number;
  results: PensionCalculationResults;
  onChangeTab: (tab: string) => void;
}

const AffordabilityChecker: React.FC<AffordabilityCheckerProps> = ({
  annualSalary,
  monthlyFundingCost,
  results,
  onChangeTab
}) => {
  // Calculate tax and take-home pay (simplified calculation)
  const monthlyGross = annualSalary / 12;
  const personalAllowance = 12570;
  const basicRateThreshold = 50270;
  
  // Annual tax calculation
  const taxableIncome = Math.max(0, annualSalary - personalAllowance);
  const basicRateTax = Math.min(taxableIncome, basicRateThreshold - personalAllowance) * 0.2;
  const higherRateTax = Math.max(0, taxableIncome - (basicRateThreshold - personalAllowance)) * 0.4;
  const annualTax = basicRateTax + higherRateTax;
  
  // National Insurance (simplified)
  const niThreshold = 12570;
  const annualNI = Math.max(0, annualSalary - niThreshold) * 0.12;
  
  const monthlyTakeHome = (annualSalary - annualTax - annualNI) / 12;
  
  // Calculate affordability percentage
  const affordabilityPercentage = monthlyTakeHome > 0 ? (monthlyFundingCost / monthlyTakeHome) * 100 : 0;
  
  // BUOM alternative (example: 30% lower cost)
  const buomCost = monthlyFundingCost * 0.7;
  const buomAffordabilityPercentage = monthlyTakeHome > 0 ? (buomCost / monthlyTakeHome) * 100 : 0;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Affordability Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Income Summary */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-3">Monthly Income Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Gross Monthly Salary:</span>
                <span className="font-medium">{formatCurrency(monthlyGross)}</span>
              </div>
              <div className="flex justify-between">
                <span>Income Tax:</span>
                <span className="font-medium">-{formatCurrency(annualTax / 12)}</span>
              </div>
              <div className="flex justify-between">
                <span>National Insurance:</span>
                <span className="font-medium">-{formatCurrency(annualNI / 12)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-medium">
                <span>Monthly Take Home:</span>
                <span>{formatCurrency(monthlyTakeHome)}</span>
              </div>
            </div>
          </div>

          {/* Funding Options */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Standard Funding */}
            <Card className="border border-orange-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-orange-700">Standard Funding</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {formatCurrency(monthlyFundingCost)}
                  </div>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
                
                <div className="bg-orange-50 p-3 rounded">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${affordabilityPercentage > 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {affordabilityPercentage.toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-600">of take-home pay</p>
                  </div>
                </div>

                <div className="text-xs text-center text-gray-500">
                  {affordabilityPercentage > 10 ? '⚠️ May be challenging' : '✅ Looks affordable'}
                </div>
              </CardContent>
            </Card>

            {/* BUOM Funding */}
            <Card className="border border-green-200 bg-green-50/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-green-700">BUOM Alternative</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {formatCurrency(buomCost)}
                  </div>
                  <p className="text-sm text-gray-600">per month</p>
                </div>
                
                <div className="bg-green-100 p-3 rounded">
                  <div className="text-center">
                    <div className={`text-lg font-bold ${buomAffordabilityPercentage > 10 ? 'text-red-600' : 'text-green-600'}`}>
                      {buomAffordabilityPercentage.toFixed(1)}%
                    </div>
                    <p className="text-xs text-gray-600">of take-home pay</p>
                  </div>
                </div>

                <div className="text-xs text-center text-gray-500">
                  💰 Save {formatCurrency(monthlyFundingCost - buomCost)}/month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Affordability Guidelines */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-900 mb-3">Affordability Guidelines</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span><strong>0-5%</strong> of take-home pay - Very affordable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span><strong>5-10%</strong> of take-home pay - Manageable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span><strong>10-15%</strong> of take-home pay - Challenging but possible</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span><strong>15%+</strong> of take-home pay - May need to reconsider</span>
              </div>
            </div>
          </div>

          {/* PLSA Retirement Standards */}
          <div className="bg-teal-50 p-4 rounded-lg border border-teal-200">
            <h3 className="font-medium text-teal-900 mb-3">PLSA Retirement Living Standards</h3>
            <div className="grid gap-4 md:grid-cols-3 text-sm">
              <div className="text-center">
                <div className="font-bold text-teal-700">MINIMUM</div>
                <div className="text-lg font-bold">£14,400</div>
                <div className="text-xs text-teal-600">per year</div>
                <div className="mt-2 text-xs">
                  ✓ Covers all basic needs<br/>
                  ✓ Some social activities
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-teal-700">MODERATE</div>
                <div className="text-lg font-bold">£31,300</div>
                <div className="text-xs text-teal-600">per year</div>
                <div className="mt-2 text-xs">
                  ✓ More financial security<br/>
                  ✓ Flexible lifestyle choices
                </div>
              </div>
              <div className="text-center">
                <div className="font-bold text-teal-700">COMFORTABLE</div>
                <div className="text-lg font-bold">£43,100</div>
                <div className="text-xs text-teal-600">per year</div>
                <div className="mt-2 text-xs">
                  ✓ Financial freedom<br/>
                  ✓ Luxuries and holidays
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center pt-4">
            <Button 
              onClick={() => onChangeTab("calculator")} 
              variant="outline"
            >
              ← Back to Calculator
            </Button>
            <Button 
              onClick={() => onChangeTab("funding-eligibility")} 
              className="bg-green-600 hover:bg-green-700"
            >
              Explore Funding Options →
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffordabilityChecker;
