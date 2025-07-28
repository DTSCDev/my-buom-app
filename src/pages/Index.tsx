import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Calculator, TrendingUp, DollarSign, Shield } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Free RS Calculator</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline" asChild>
              <Link to="/auth">Sign In</Link>
            </Button>
            <Button asChild>
              <Link to="/calculator">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Free Retirement Savings Calculator
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Calculate your pension shortfall and discover how much you need to save for a comfortable retirement. 
            Get personalized insights and planning recommendations - completely free.
          </p>
          <Button size="lg" asChild className="text-lg px-8 py-4">
            <Link to="/calculator">Calculate My Retirement Shortfall</Link>
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card>
            <CardHeader className="text-center">
              <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Free Calculator</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Calculate your retirement shortfall instantly with no registration required
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Personalized Results</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Get tailored recommendations based on your age, salary, and existing pension
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <DollarSign className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>APF Planning</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Explore Alternative Pension Funding options for enhanced retirement planning
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <CardTitle>Secure & Private</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center">
                Your financial data is protected with enterprise-grade security
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Plan Your Retirement?
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Get started with our free calculator, then register for advanced features including 
            portfolio tracking, APF registration, and personalized recommendations.
          </p>
          <div className="space-x-4">
            <Button size="lg" asChild>
              <Link to="/calculator">Try Free Calculator</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/auth">Create Account</Link>
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Free RS Calculator. All rights reserved.</p>
          <p className="mt-2 text-sm">
            Professional retirement planning tools for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
