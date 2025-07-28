import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NetAssetValue() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Net Asset Value</h1>
        <p className="text-gray-600 mt-2">
          Track and manage your assets and liabilities
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Asset & Liability Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Asset and liability tracking features will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
