import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PensionCalculationResults } from './SophisticatedPensionForm';
import { formatCurrency } from '@/lib/utils';

interface PensionResultsDisplayProps {
  results: PensionCalculationResults;
  onChangeTab: (tab: string) => void;
}

const PensionResultsDisplay: React.FC<PensionResultsDisplayProps> = ({
  results,
  onChangeTab
}) => {
  const [showFinancialAssistanceCTA, setShowFinancialAssistanceCTA] = useState(true);

  if (!results) return null;

  // Handle both object and number types for yearsUntilPension
  const yearsUntilPensionNumber = typeof results.yearsUntilPension === 'object' 
    ? results.yearsUntilPension.years + (results.yearsUntilPension.months / 12)
    : results.yearsUntilPension;

  // Calculate progress percentage
  const progressPercentage = results.requiredCapital > 0 
    ? Math.round((results.totalProjectedAssets / results.requiredCapital) * 100)
    : 100;

  const isOnTrack = progressPercentage >= 100;
  const isReasonablyOnTrack = progressPercentage >= 80;

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="border-2 border-blue-200 bg-blue-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>Your Pension Projection</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Financial Assistance CTA */}
          {showFinancialAssistanceCTA && !isOnTrack && (
            <div className="bg-orange-100 border border-orange-300 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-orange-600">⚠️</div>
                <div>
                  <p className="font-medium text-orange-800">Need Financial Assistance?</p>
                  <p className="text-sm text-orange-700">
                    Explore funding options to bridge your pension gap
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={() => onChangeTab("funding-eligibility")} 
                  size="sm" 
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Get Help
                </Button>
                <Button 
                  onClick={() => setShowFinancialAssistanceCTA(false)} 
                  variant="ghost" 
                  size="sm" 
                  className="text-orange-600 hover:text-orange-800"
                >
                  ×
                </Button>
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {/* Funding Progress */}
            <div className="space-y-2 relative">
              <h3 className="font-medium text-gray-900">Funding Progress</h3>
              <div className={`text-3xl font-bold ${progressPercentage >= 100 ? 'text-green-600' : progressPercentage >= 80 ? 'text-yellow-500' : 'text-red-600'}`}>
                {progressPercentage}%
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    progressPercentage >= 100 ? 'bg-green-600' : 
                    progressPercentage >= 80 ? 'bg-yellow-500' : 'bg-red-600'
                  }`}
                  style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600">
                {isOnTrack ? "Congratulations! You're on track for retirement." : 
                 isReasonablyOnTrack ? "You're close to your retirement target." : 
                 "You have a pension funding gap that needs attention."}
              </p>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                SFM-004
              </div>
            </div>

            {/* Current Projection */}
            <div className="space-y-2 relative">
              <h3 className="font-medium text-gray-900">Current Projection</h3>
              <div className={`text-3xl font-bold ${progressPercentage >= 100 ? 'text-green-600' : progressPercentage >= 80 ? 'text-yellow-500' : 'text-red-600'}`}>
                {formatCurrency(results.totalProjectedAssets)}
              </div>
              <p className="text-sm text-gray-600">
                Projected pension pot at retirement
              </p>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                SFM-005
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Required Capital */}
            <div className="space-y-2 relative">
              <h3 className="font-medium text-gray-900">Required Capital assuming full State Pension</h3>
              <div className="text-3xl font-bold text-black">
                {formatCurrency(results.requiredCapital)}
              </div>
              <p className="text-sm text-gray-600">
                Capital needed for target retirement income
              </p>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                SFM-006
              </div>
            </div>

            {/* Shortfall */}
            <div className="space-y-2 relative">
              <h3 className="font-medium text-gray-900">Current Pension Shortfall</h3>
              <div className={`text-3xl font-bold ${results.currentCapitalShortfall > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(results.currentCapitalShortfall)}
              </div>
              <p className="text-sm text-gray-600">
                {results.currentCapitalShortfall > 0 ? 'Additional capital required' : 'No shortfall - you\'re on track!'}
              </p>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                SFM-007
              </div>
            </div>
          </div>

          {/* Monthly Funding Cost */}
          {results.monthlyFundingCost && results.monthlyFundingCost > 0 && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h3 className="font-medium text-yellow-900 mb-2">Monthly Funding Required</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-yellow-800">
                    {formatCurrency(results.monthlyFundingCost)}
                  </div>
                  <p className="text-sm text-yellow-700">
                    Monthly top-up needed to reach your target
                  </p>
                </div>
                <Button 
                  onClick={() => onChangeTab("affordability")} 
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  Check Affordability
                </Button>
              </div>
              <div className="absolute bottom-0 right-0 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded border">
                SFM-008
              </div>
            </div>
          )}

          {/* Key Assumptions */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 mb-3">Key Calculation Details</h3>
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-blue-700">Current Age:</span>
                <span className="font-medium">{results.currentAge} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Years to Retirement:</span>
                <span className="font-medium">{results.yearsUntilPensionFormatted}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Annual Salary:</span>
                <span className="font-medium">{formatCurrency(results.annualSalary)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Target Income (60% of salary):</span>
                <span className="font-medium">{formatCurrency(results.targetIncome)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-700">Existing Pension Value:</span>
                <span className="font-medium">{formatCurrency(results.existingPensionValue)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        <Button 
          onClick={() => onChangeTab("affordability")} 
          variant="outline"
          className="px-6"
        >
          View Affordability Analysis
        </Button>
        <Button 
          onClick={() => onChangeTab("funding-eligibility")} 
          className="px-6"
        >
          Explore Funding Options
        </Button>
      </div>
    </div>
  );
};

export default PensionResultsDisplay;
