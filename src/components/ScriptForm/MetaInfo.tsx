
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Script } from '@/types/catalog';

interface MetaInfoProps {
  script: Script;
}

const MetaInfo: React.FC<MetaInfoProps> = ({ script }) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{script.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="text-gray-700">{script.description}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Category</h3>
              <p className="text-gray-700">{script.category}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="text-gray-700">{script.meta.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Platforms</h3>
              <p className="text-gray-700">{script.meta.platforms.join(', ')}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Owner Information</h3>
              <div className="pl-3">
                <p className="text-gray-700"><span className="font-medium">Email:</span> {script.meta.Owner.email}</p>
                <p className="text-gray-700"><span className="font-medium">Project:</span> {script.meta.Owner.project}</p>
                <p className="text-gray-700"><span className="font-medium">Team:</span> {script.meta.Owner.team.join(', ')}</p>
                <p className="text-gray-700"><span className="font-medium">Team ID:</span> {script.meta.Owner.teamID}</p>
                <p className="text-gray-700"><span className="font-medium">Group:</span> {script.meta.Owner.defineDgroupname}</p>
                {script.meta.Owner.defineDgroupname2 && (
                  <p className="text-gray-700"><span className="font-medium">Group 2:</span> {script.meta.Owner.defineDgroupname2}</p>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Available Actions</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {script.actions.map((action) => (
                  <li key={action.id}>{action.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MetaInfo;
