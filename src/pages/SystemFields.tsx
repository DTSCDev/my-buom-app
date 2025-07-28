import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SystemFields() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Fields</h1>
        <p className="text-gray-600 mt-2">
          System configuration and admin tools
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>System Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            System fields configuration will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
