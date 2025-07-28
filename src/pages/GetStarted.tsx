import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function GetStarted() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Get Started</h1>
        <p className="text-gray-600 mt-2">
          Welcome guide and getting started information
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Getting started guide will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
