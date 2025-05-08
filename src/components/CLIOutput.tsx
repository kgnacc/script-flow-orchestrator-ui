
import React, { useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

interface CLIOutputProps {
  output: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatCLIOutput = (output: string): React.ReactNode => {
  if (!output) return null;
  
  // Replace new lines with <br> and apply styling based on log type
  const lines = output.split('\n');
  
  return (
    <>
      {lines.map((line, i) => {
        let className = '';
        
        if (line.includes('[SUCCESS]')) className = 'success';
        else if (line.includes('[ERROR]')) className = 'error';
        else if (line.includes('[WARNING]')) className = 'warning';
        else if (line.includes('[INFO]')) className = 'info';
        
        return (
          <div key={i} className={className}>
            {line}
          </div>
        );
      })}
      <div className="cursor-blink"></div>
    </>
  );
};

const CLIOutput: React.FC<CLIOutputProps> = ({ output, isOpen, onClose }) => {
  const cliRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen && cliRef.current) {
      cliRef.current.scrollTop = cliRef.current.scrollHeight;
    }
  }, [output, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Script Execution Output</DialogTitle>
          <DialogDescription>
            Command line output from the script execution
          </DialogDescription>
        </DialogHeader>
        <div className="cli-output" ref={cliRef}>
          {formatCLIOutput(output || '')}
        </div>
        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CLIOutput;
