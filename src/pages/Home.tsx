
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Script Orchestrator</h1>
        
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to Script Orchestrator</CardTitle>
              <CardDescription>
                A powerful tool to manage and execute automation scripts through your custom Python API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                This application provides an intuitive interface for running various automation scripts 
                through your Python API services. Select scripts from the catalog, configure parameters, 
                and view real-time execution output.
              </p>
              
              <div className="flex justify-center mt-6">
                <Button asChild>
                  <Link to="/scripts">Go to Script Runner</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2">
                <li>Browse script catalog with hierarchical organization</li>
                <li>Dynamic form generation based on script requirements</li>
                <li>Parameter validation and confirmation</li>
                <li>Real-time CLI output display</li>
                <li>Support for various parameter types</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Navigate to the Script Runner page</li>
                <li>Select a script from the catalog tree</li>
                <li>Review the script information</li>
                <li>Choose an action and configure parameters</li>
                <li>Confirm your selections and execute the script</li>
                <li>View the real-time output in the CLI window</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
