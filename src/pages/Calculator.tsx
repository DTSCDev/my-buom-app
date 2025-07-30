import PensionCalculator from "@/components/PensionCalculator";

const Calculator = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="mx-auto container py-4 sm:py-8">
        <PensionCalculator defaultTab="calculator" />
      </div>
    </div>
  );
};

export default Calculator;
