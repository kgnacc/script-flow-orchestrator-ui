
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAppContext } from '@/context/AppContext';
import MetaInfo from './MetaInfo';
import ActionForm from './ActionForm';
import ConfirmationView from './ConfirmationView';
import CLIOutput from '../CLIOutput';
import { Server, Terminal } from 'lucide-react';

// Step definition
type FormStep = 'info' | 'action' | 'confirm';

const ScriptForm: React.FC = () => {
  const { selectedScript, selectedAction, scriptOutput, setScriptOutput } = useAppContext();
  const [currentStep, setCurrentStep] = useState<FormStep>('info');
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isOutputOpen, setIsOutputOpen] = useState(false);

  if (!selectedScript) {
    return (
      <div className="h-full flex items-center justify-center p-8">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-600 mb-2">No Script Selected</h3>
          <p className="text-gray-500">Please select a script from the catalog to continue</p>
        </div>
      </div>
    );
  }

  const handleActionFormNext = (data: Record<string, any>) => {
    setFormData(data);
    setCurrentStep('confirm');
  };

  const handleBackToAction = () => {
    setCurrentStep('action');
  };

  const handleScriptComplete = () => {
    setIsOutputOpen(true);
  };

  const closeOutput = () => {
    setIsOutputOpen(false);
    setCurrentStep('info');
    setFormData({});
  };

  const getScriptIcon = () => {
    if (selectedScript.category === 'unix') {
      return <Terminal className="inline mr-2" />;
    }
    return <Server className="inline mr-2" />;
  };

  return (
    <div className="script-form-container p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        {getScriptIcon()}
        {selectedScript.name}
      </h2>
      
      <Tabs value={currentStep} onValueChange={(value) => setCurrentStep(value as FormStep)}>
        <TabsList className="mb-8">
          <TabsTrigger value="info" disabled={currentStep !== 'info'}>
            1. Script Information
          </TabsTrigger>
          <TabsTrigger value="action" disabled={currentStep === 'info'}>
            2. Action & Parameters
          </TabsTrigger>
          <TabsTrigger value="confirm" disabled={currentStep !== 'confirm'}>
            3. Confirm & Execute
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="info">
          <MetaInfo script={selectedScript} />
          <div className="mt-6 flex justify-end">
            <button 
              onClick={() => setCurrentStep('action')}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Next: Configure Action
            </button>
          </div>
        </TabsContent>
        
        <TabsContent value="action">
          <ActionForm script={selectedScript} onNext={handleActionFormNext} />
        </TabsContent>
        
        <TabsContent value="confirm">
          {selectedAction && (
            <ConfirmationView 
              formData={formData}
              action={selectedAction}
              onBack={handleBackToAction}
              onComplete={handleScriptComplete}
            />
          )}
        </TabsContent>
      </Tabs>
      
      <CLIOutput 
        output={scriptOutput} 
        isOpen={isOutputOpen} 
        onClose={closeOutput} 
      />
    </div>
  );
};

export default ScriptForm;
