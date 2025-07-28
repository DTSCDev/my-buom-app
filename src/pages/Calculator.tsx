import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { calculateRetirementShortfall } from "@/utils/calculator";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Calculator() {
  const [currentAge, setCurrentAge] = useState<number>(35);
  const [annualSalary, setAnnualSalary] = useState<number>(50000);
  const [existingPension, setExistingPension] = useState<number>(25000);
  const [targetRetirementAge, setTargetRetirementAge] = useState<number>(67);
  const [results, setResults] = useState<any>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    try {
      const calculationResults = calculateRetirementShortfall(
        currentAge,
        annualSalary,
        existingPension,
        targetRetirementAge
      );
      setResults(calculationResults);
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Please check your inputs and try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-900">Free Retirement Calculator</h1>
          <Button variant="outline" asChild>
            <Link to="/auth">Sign Up for More Features</Link>
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Calculate Your Retirement Shortfall
            </h2>
            <p className="text-lg text-gray-600">
              Enter your details below to get a personalized retirement savings analysis
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card>
              <CardHeader>
                <CardTitle>Your Details</CardTitle>
                <CardDescription>
                  Provide your current financial information for accurate calculations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Age
                  </label>
                  <Input
                    type="number"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    min={18}
                    max={100}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Salary (£)
                  </label>
                  <Input
                    type="number"
                    value={annualSalary}
                    onChange={(e) => setAnnualSalary(Number(e.target.value))}
                    min={0}
                    step={1000}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Existing Pension Value (£)
                  </label>
                  <Input
                    type="number"
                    value={existingPension}
                    onChange={(e) => setExistingPension(Number(e.target.value))}
                    min={0}
                    step={1000}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Retirement Age
                  </label>
                  <Input
                    type="number"
                    value={targetRetirementAge}
                    onChange={(e) => setTargetRetirementAge(Number(e.target.value))}
                    min={50}
                    max={80}
                  />
                </div>

                <Button 
                  onClick={handleCalculate} 
                  className="w-full"
                  disabled={isCalculating}
                >
                  {isCalculating ? 'Calculating...' : 'Calculate My Shortfall'}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card>
              <CardHeader>
                <CardTitle>Your Results</CardTitle>
                <CardDescription>
                  {results ? 'Your personalized retirement analysis' : 'Results will appear here after calculation'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {results ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-900">Target Income</h4>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatCurrency(results.targetIncomeAtRetirement)}
                        </p>
                        <p className="text-sm text-blue-700">per year in retirement</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-900">Projected Income</h4>
                        <p className="text-2xl font-bold text-green-600">
                          {formatCurrency(results.totalProjectedIncome)}
                        </p>
                        <p className="text-sm text-green-700">from current savings</p>
                      </div>
                    </div>

                    {results.incomeShortfall > 0 ? (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-900 mb-2">Income Shortfall</h4>
                        <p className="text-3xl font-bold text-red-600 mb-2">
                          {formatCurrency(results.incomeShortfall)}
                        </p>
                        <p className="text-sm text-red-700 mb-4">per year in retirement</p>
                        
                        <div className="bg-white p-3 rounded border">
                          <p className="font-semibold text-gray-900">To fill this gap, you need:</p>
                          <p className="text-lg font-bold text-gray-800">
                            {formatCurrency(results.monthlySavingsRequired)} per month
                          </p>
                          <p className="text-sm text-gray-600">
                            for the next {results.yearsToRetirement} years
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                        <h4 className="font-semibold text-green-900 mb-2">🎉 Congratulations!</h4>
                        <p className="text-green-700">
                          You're on track for your retirement goals. Consider speaking with a financial advisor 
                          to optimize your savings strategy.
                        </p>
                      </div>
                    )}

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Progress to Goal</h4>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(results.progressPercentage, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {results.progressPercentage.toFixed(1)}% of target income covered
                      </p>
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm text-gray-600 mb-4">
                        Want more detailed analysis and planning tools?
                      </p>
                      <Button asChild className="w-full">
                        <Link to="/auth">Sign Up for Advanced Features</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>Enter your details and click "Calculate" to see your results</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
