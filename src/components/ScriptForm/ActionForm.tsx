
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Script, ScriptAction, ScriptParameter } from '@/types/catalog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/context/AppContext';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useIsMobile } from '@/hooks/use-mobile';
import { Users, FolderKanban, PlayCircle } from 'lucide-react';

interface ActionFormProps {
  script: Script;
  onNext: (formData: Record<string, any>) => void;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;
  selectedProject: string;
  setSelectedProject: (project: string) => void;
}

// Mock data for teams and projects
const mockTeams = [
  { value: 'team1', label: 'DevOps Team' },
  { value: 'team2', label: 'Frontend Team' },
  { value: 'team3', label: 'Backend Team' }
];

const mockProjects = [
  { value: 'proj1', label: 'Website Migration' },
  { value: 'proj2', label: 'Cloud Infrastructure' },
  { value: 'proj3', label: 'Database Upgrade' }
];

const ActionForm: React.FC<ActionFormProps> = ({ 
  script, 
  onNext, 
  selectedTeam, 
  setSelectedTeam, 
  selectedProject, 
  setSelectedProject 
}) => {
  const { selectedAction, setSelectedAction } = useAppContext();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const isMobile = useIsMobile();
  
  // Handle action selection
  const handleActionChange = (actionId: string) => {
    const action = script.actions.find(a => a.id === actionId) || null;
    setSelectedAction(action);
    setFormData({});
  };

  // Create dynamic schema based on selected action
  const createDynamicSchema = (action: ScriptAction | null) => {
    if (!action) return z.object({});
    
    const schemaMap: Record<string, any> = {};
    
    action.parameters.forEach(param => {
      let validator: any = z.any();
      
      switch(param.type) {
        case 'text':
          validator = z.string();
          if (param.required) validator = validator.min(1, { message: 'This field is required' });
          if (param.validation?.pattern) validator = validator.regex(new RegExp(param.validation.pattern), { message: param.validation.errorMessage || 'Invalid format' });
          if (param.validation?.minLength) validator = validator.min(param.validation.minLength, { message: `Must be at least ${param.validation.minLength} characters` });
          if (param.validation?.maxLength) validator = validator.max(param.validation.maxLength, { message: `Must be at most ${param.validation.maxLength} characters` });
          break;
        case 'number':
          validator = z.number();
          if (param.validation?.min !== undefined) validator = validator.min(param.validation.min, { message: `Must be at least ${param.validation.min}` });
          if (param.validation?.max !== undefined) validator = validator.max(param.validation.max, { message: `Must be at most ${param.validation.max}` });
          if (param.required) validator = validator;
          else validator = validator.optional();
          break;
        case 'boolean':
          validator = z.boolean().optional();
          break;
        case 'select':
          validator = z.string();
          if (param.required) validator = validator.min(1, { message: 'Please select an option' });
          break;
        case 'multiselect':
          validator = z.array(z.string()).optional();
          if (param.required) validator = z.array(z.string()).min(1, { message: 'Please select at least one option' });
          break;
        case 'textarea':
          validator = z.string();
          if (param.required) validator = validator.min(1, { message: 'This field is required' });
          if (param.validation?.minLength) validator = validator.min(param.validation.minLength, { message: `Must be at least ${param.validation.minLength} characters` });
          if (param.validation?.maxLength) validator = validator.max(param.validation.maxLength, { message: `Must be at most ${param.validation.maxLength} characters` });
          break;
      }
      
      schemaMap[param.id] = validator;
    });
    
    return z.object(schemaMap);
  };

  // Create form with the dynamic schema
  const dynamicSchema = createDynamicSchema(selectedAction);
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<Record<string, any>>({
    resolver: zodResolver(dynamicSchema),
    defaultValues: formData,
    mode: 'onChange', // This will validate on change to enable/disable button appropriately
  });

  const onSubmit = (data: Record<string, any>) => {
    if (!selectedAction) {
      toast.error("Please select an action before proceeding");
      return;
    }
    
    if (!selectedTeam) {
      toast.error("Please select a team");
      return;
    }

    if (!selectedProject) {
      toast.error("Please select a project");
      return;
    }
    
    setFormData(data);
    onNext({
      ...data,
      actionId: selectedAction.id,
      actionName: selectedAction.name,
      endpoint: selectedAction.endpoint,
      method: selectedAction.method
    });
  };

  // Render parameter input based on its type
  const renderParameterInput = (parameter: ScriptParameter) => {
    switch (parameter.type) {
      case 'text':
        return (
          <Controller
            name={parameter.id}
            control={control}
            defaultValue={parameter.default || ''}
            render={({ field }) => (
              <Input 
                {...field} 
                placeholder={parameter.label}
                className="w-full"
              />
            )}
          />
        );
      case 'number':
        return (
          <Controller
            name={parameter.id}
            control={control}
            defaultValue={parameter.default || ''}
            render={({ field }) => (
              <Input 
                {...field} 
                type="number" 
                placeholder={parameter.label}
                className="w-full"
                onChange={e => field.onChange(Number(e.target.value))}
              />
            )}
          />
        );
      case 'boolean':
        return (
          <Controller
            name={parameter.id}
            control={control}
            defaultValue={parameter.default || false}
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id={parameter.id} 
                  checked={field.value} 
                  onCheckedChange={field.onChange} 
                />
                <Label htmlFor={parameter.id}>{parameter.label}</Label>
              </div>
            )}
          />
        );
      case 'select':
        return (
          <Controller
            name={parameter.id}
            control={control}
            defaultValue={parameter.default || ''}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={`Select ${parameter.label}`} />
                </SelectTrigger>
                <SelectContent>
                  {parameter.options?.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        );
      case 'multiselect':
        // For multiselect, we'll use radio group instead of checkboxes for better space usage
        return (
          <Controller
            name={parameter.id}
            control={control}
            defaultValue={parameter.default as string[] || []}
            render={({ field }) => (
              <div className="space-y-1">
                <RadioGroup 
                  className="flex flex-wrap gap-2"
                  value={field.value?.[0] || ''}
                  onValueChange={(value) => field.onChange([value])}
                >
                  {parameter.options?.map(option => (
                    <div key={option.value} className="flex items-center space-x-1">
                      <RadioGroupItem value={option.value} id={`${parameter.id}-${option.value}`} />
                      <Label htmlFor={`${parameter.id}-${option.value}`} className="text-sm">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          />
        );
      case 'textarea':
        return (
          <Controller
            name={parameter.id}
            control={control}
            defaultValue={parameter.default || ''}
            render={({ field }) => (
              <Textarea 
                {...field} 
                placeholder={parameter.label}
                className="w-full"
                rows={2} // Reduced from 4 to 2 for better space usage
              />
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Card className="mb-4">
        <CardHeader className="py-3">
          <CardTitle className="text-base">Select Context</CardTitle>
        </CardHeader>
        <CardContent className="py-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {/* Action dropdown */}
            <div className="space-y-1">
              <div className="flex items-center text-sm mb-1">
                <PlayCircle className="h-4 w-4 mr-1" />
                <span>Action</span>
              </div>
              <Select 
                onValueChange={handleActionChange}
                value={selectedAction?.id || ''}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an action" />
                </SelectTrigger>
                <SelectContent>
                  {script.actions.map(action => (
                    <SelectItem key={action.id} value={action.id}>
                      {action.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Team dropdown */}
            <div className="space-y-1">
              <div className="flex items-center text-sm mb-1">
                <Users className="h-4 w-4 mr-1" />
                <span>Team</span>
              </div>
              <Select 
                onValueChange={setSelectedTeam}
                value={selectedTeam}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {mockTeams.map(team => (
                    <SelectItem key={team.value} value={team.value}>
                      {team.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Project dropdown */}
            <div className="space-y-1">
              <div className="flex items-center text-sm mb-1">
                <FolderKanban className="h-4 w-4 mr-1" />
                <span>Project</span>
              </div>
              <Select 
                onValueChange={setSelectedProject}
                value={selectedProject}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {mockProjects.map(project => (
                    <SelectItem key={project.value} value={project.value}>
                      {project.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedAction && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader className="py-2">
              <CardTitle className="text-base">{selectedAction.name} Parameters</CardTitle>
              <CardDescription className="text-xs">{selectedAction.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-23rem)] pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                  {selectedAction.parameters.map(param => (
                    <div key={param.id} className="space-y-1">
                      <Label htmlFor={param.id} className="text-xs">
                        {param.label} {param.required && <span className="text-red-500">*</span>}
                      </Label>
                      {renderParameterInput(param)}
                      {errors[param.id] && (
                        <p className="text-xs text-red-500">
                          {errors[param.id]?.message?.toString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <Button 
                type="submit" 
                className="w-full mt-4"
                disabled={!isValid || !selectedAction || !selectedTeam || !selectedProject}
              >
                Continue
              </Button>
            </CardContent>
          </Card>
        </form>
      )}
    </div>
  );
};

export default ActionForm;
