import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function APFRegistration() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">APF Registration</h1>
        <p className="text-gray-600 mt-2">
          Apply for Alternative Pension Funding
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>APF Application Process</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            APF registration process will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
