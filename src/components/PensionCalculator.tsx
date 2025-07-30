import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SophisticatedPensionForm from './SophisticatedPensionForm';
import PensionResultsDisplay from './PensionResultsDisplay';
import AffordabilityChecker from './AffordabilityChecker';
import { PensionCalculationResults } from './SophisticatedPensionForm';

const PensionCalculator = ({ defaultTab = 'calculator' }) => {
  const [results, setResults] = useState<PensionCalculationResults | null>(null);
  const [activeTab, setActiveTab] = useState(defaultTab);

  // Debug logging to check tab rendering
  useEffect(() => {
    console.log('=== PENSION CALCULATOR DEBUG ===');
    console.log('Component mounted');
    console.log('Active tab:', activeTab);
    console.log('Results:', results ? 'Present' : 'Not present');
  }, [activeTab, results]);

  // Scroll to top when tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleCalculationComplete = (calculationResults: PensionCalculationResults) => {
    console.log('=== PENSION CALCULATOR USING SOPHISTICATED FORM ===');
    
    // Use the sophisticated form results
    const correctedResults = {
      ...calculationResults,
    };
    
    console.log('Sophisticated form results:', correctedResults);
    setResults(correctedResults);
    // Don't auto-advance to results tab - let user navigate manually
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            FREE Retirement Shortfall Calculator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
            Discover your pension shortfall and explore funding options
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Professional pension planning tools to secure your financial future
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="calculator" className="text-sm px-2 py-2">
              Calculator
            </TabsTrigger>
            <TabsTrigger value="results" className="text-sm px-2 py-2">
              Results
            </TabsTrigger>
            <TabsTrigger value="affordability" className="text-sm px-2 py-2">
              Affordability
            </TabsTrigger>
            <TabsTrigger value="funding-eligibility" className="text-sm px-2 py-2">
              Funding
            </TabsTrigger>
            <TabsTrigger value="parameters" className="text-sm px-2 py-2">
              Parameters
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="mt-8">
            <SophisticatedPensionForm onCalculationComplete={handleCalculationComplete} />
            {results && (
              <div className="mt-8 space-y-8">
                <PensionResultsDisplay 
                  results={results} 
                  onChangeTab={setActiveTab}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="results" className="mt-8">
            {results ? (
              <PensionResultsDisplay 
                results={results} 
                onChangeTab={setActiveTab}
              />
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Please complete the calculator first to view your results.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="affordability" className="mt-8">
            {results ? (
              <AffordabilityChecker
                annualSalary={results.annualSalary}
                monthlyFundingCost={results.monthlyFundingCost || 0}
                results={results}
                onChangeTab={setActiveTab}
              />
            ) : (
              <div className="text-center p-8">
                <p className="text-gray-600 dark:text-gray-300">
                  Please complete the calculator first to view affordability analysis.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="funding-eligibility" className="mt-8">
            <div className="text-center p-8">
              <p className="text-gray-600 dark:text-gray-300">
                Funding eligibility form coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="parameters" className="mt-8">
            <div className="text-center p-8">
              <p className="text-gray-600 dark:text-gray-300">
                Parameters configuration coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PensionCalculator;
