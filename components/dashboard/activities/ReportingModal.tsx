
import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { ActivityData } from '@/types';

interface Activity {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'in-progress' | 'completed';
  targetOutreach: number;
}

interface ReportingModalProps {
  activity: ActivityData | undefined;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const ReportingModal: React.FC<ReportingModalProps> = ({ activity, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    priorityArea: '',
    objective: '',
    outcome: '',
    output: '',
    activityName: activity?.title,
    targetOutreach: activity?.targetOutreach,
    actualOutreach: '',
    maleAbove35: '',
    femaleAbove35: '',
    youthBelow35: '',
    pwd: '',
    activityCost: '',
    challenges: '',
    remarks: ''
  });

  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setEvidenceFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      evidenceFiles,
      submittedAt: new Date().toISOString()
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Complete Activity Report</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Activity: {activity?.title}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Priority Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority Area *</label>
              <select
                name="priorityArea"
                value={formData.priorityArea}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="">Select Priority Area</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="economic-empowerment">Economic Empowerment</option>
                <option value="social-inclusion">Social Inclusion</option>
                <option value="governance">Governance</option>
                <option value="environment">Environment</option>
              </select>
            </div>

            {/* Objective */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Objective *</label>
              <input
                type="text"
                name="objective"
                value={formData.objective}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter the objective"
              />
            </div>

            {/* Outcome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Outcome *</label>
              <input
                type="text"
                name="outcome"
                value={formData.outcome}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter the outcome"
              />
            </div>

            {/* Output */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Output *</label>
              <input
                type="text"
                name="output"
                value={formData.output}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter the output"
              />
            </div>

            {/* Activity Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity</label>
              <input
                type="text"
                name="activityName"
                value={formData.activityName}
                onChange={handleInputChange}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            {/* Target Outreach */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Outreach</label>
              <input
                type="number"
                name="targetOutreach"
                value={formData.targetOutreach}
                onChange={handleInputChange}
                readOnly
                className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-50"
              />
            </div>

            {/* Actual Outreach */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Actual Outreach *</label>
              <input
                type="number"
                name="actualOutreach"
                value={formData.actualOutreach}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="Enter actual outreach"
              />
            </div>

            {/* Male (above 35 years) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Male (above 35 years) *</label>
              <input
                type="number"
                name="maleAbove35"
                value={formData.maleAbove35}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="0"
              />
            </div>

            {/* Female (above 35 years) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Female (above 35 years) *</label>
              <input
                type="number"
                name="femaleAbove35"
                value={formData.femaleAbove35}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="0"
              />
            </div>

            {/* Youth (below 35 years) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Youth (below 35 years) *</label>
              <input
                type="number"
                name="youthBelow35"
                value={formData.youthBelow35}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="0"
              />
            </div>

            {/* People with Disabilities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">People with Disabilities (PWD) *</label>
              <input
                type="number"
                name="pwd"
                value={formData.pwd}
                onChange={handleInputChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="0"
              />
            </div>

            {/* Activity Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Activity Cost *</label>
              <input
                type="number"
                name="activityCost"
                value={formData.activityCost}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Challenges */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Challenges (Optional)</label>
            <textarea
              name="challenges"
              value={formData.challenges}
              onChange={handleInputChange}
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe any challenges faced during the activity"
            />
          </div>

          {/* Evidence Files */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Attach Evidence (Multiple files allowed)</label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4">
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept="image/*,application/pdf,.doc,.docx"
                className="w-full bg-gray-50 cursor-pointer p-1 rounded-md"
              />
              <p className="text-sm text-gray-500 mt-2">
                Supported formats: Images, PDF, Word documents
              </p>
            </div>
            
            {evidenceFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-sm font-medium text-gray-700">Selected files:</p>
                {evidenceFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm text-gray-600">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks *</label>
            <textarea
              name="remarks"
              value={formData.remarks}
              onChange={handleInputChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter any additional remarks or observations"
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Submit Report</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
