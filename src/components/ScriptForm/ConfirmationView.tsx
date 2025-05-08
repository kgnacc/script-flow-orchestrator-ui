
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ScriptAction } from '@/types/catalog';
import { executeScript } from '@/services/api';
import { useAppContext } from '@/context/AppContext';

interface ConfirmationViewProps {
  formData: Record<string, any>;
  action: ScriptAction;
  onBack: () => void;
  onComplete: () => void;
}

const ConfirmationView: React.FC<ConfirmationViewProps> = ({ 
  formData, 
  action, 
  onBack, 
  onComplete 
}) => {
  const { setScriptOutput } = useAppContext();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleExecuteScript = async () => {
    setIsLoading(true);
    
    try {
      // Extract the payload data (remove metadata like actionId, endpoint, etc.)
      const payload = { ...formData };
      delete payload.actionId;
      delete payload.actionName;
      delete payload.endpoint;
      delete payload.method;
      
      const response = await executeScript(formData.endpoint, formData.method, payload);
      setScriptOutput(response.output || null);
      onComplete();
    } catch (error) {
      console.error('Error executing script:', error);
      // Error is handled in the API service with toast
    } finally {
      setIsLoading(false);
    }
  };

  // Format parameter values for display
  const formatParamValue = (param: any) => {
    if (param === undefined || param === null) return 'Not provided';
    if (typeof param === 'boolean') return param ? 'Yes' : 'No';
    if (Array.isArray(param)) return param.join(', ');
    return param.toString();
  };

  // Get parameter labels
  const getParamLabel = (paramId: string) => {
    const param = action.parameters.find(p => p.id === paramId);
    return param ? param.label : paramId;
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Confirm Script Execution</CardTitle>
          <CardDescription>
            Please review the script parameters below before execution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Action: {formData.actionName}</h3>
              <p className="text-sm text-gray-500">Endpoint: {formData.endpoint}</p>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Parameters:</h4>
              <div className="bg-gray-50 p-4 rounded-md">
                {Object.entries(formData)
                  .filter(([key]) => !['actionId', 'actionName', 'endpoint', 'method'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="flex py-1 border-b border-gray-200 last:border-0">
                      <span className="font-medium w-1/3">{getParamLabel(key)}:</span>
                      <span className="text-gray-800">{formatParamValue(value)}</span>
                    </div>
                  ))}
              </div>
            </div>
            
            <div className="pt-4 flex justify-between">
              <Button variant="outline" onClick={onBack}>
                Back
              </Button>
              <Button 
                onClick={handleExecuteScript} 
                disabled={isLoading}
              >
                {isLoading ? 'Executing...' : 'Execute Script'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConfirmationView;
