
import React, { useState, useEffect } from 'react';
import { X, Activity, Building, MapPin, User, Calendar, Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { ActivityData } from './ActivitiesList';
import toast from 'react-hot-toast';

interface PCVEActivityModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setEditingActivity: React.Dispatch<React.SetStateAction<ActivityData | null>>;
  // onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

// Type definitions
interface PriorityArea {
  id: string;
  name: string;
}

interface Objective {
  id: string;
  name: string;
}

interface Outcome {
  id: string;
  name: string;
}

interface PredefinedOutput {
  id: string;
  name: string;
  description: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  scheduledDate: string;
  location: string;
}

interface OutputWithActivities extends PredefinedOutput {
  activities: Activity[];
}

interface FormData {
  priorityArea: string;
  objective: string;
  outcome: string;
  outputs: OutputWithActivities[];
  activities: Activity[];
  counties: string[];
  subcounties: string[];
  profileVisibility: 'PUBLIC' | 'PRIVATE' | 'RESTRICTED';
}

interface ValidationErrors {
  [key: string]: string;
}

interface NewActivity {
  title: string;
  description: string;
  scheduledDate: string;
  location: string;
}

interface OutputActivitySectionProps {
  output: OutputWithActivities;
  outputIndex: number;
  onRemoveOutput: () => void;
  onAddActivity: (activity: NewActivity) => void;
  onRemoveActivity: (activityId: number) => void;
  errors: ValidationErrors;
}

// Mock data - replace with actual API calls
const priorityAreas: PriorityArea[] = [
  { id: 'AWARENESS', name: 'Awareness' },
  { id: 'PREVENTION', name: 'Prevention' },
  { id: 'PROTECTION', name: 'Protection' },
  { id: 'RESPONSE', name: 'Response' }
];

const objectivesByPriority: Record<string, Objective[]> = {
  AWARENESS: [
    { id: 'AW1', name: 'Enhance community understanding of VE risks' },
    { id: 'AW2', name: 'Promote counter-narratives to extremist messaging' },
    { id: 'AW3', name: 'Build media literacy and critical thinking skills' }
  ],
  PREVENTION: [
    { id: 'PR1', name: 'Strengthen social cohesion and resilience' },
    { id: 'PR2', name: 'Address root causes of radicalization' },
    { id: 'PR3', name: 'Build youth engagement and leadership' }
  ],
  PROTECTION: [
    { id: 'PT1', name: 'Enhance security measures and protocols' },
    { id: 'PT2', name: 'Protect vulnerable populations' },
    { id: 'PT3', name: 'Strengthen institutional capacity' }
  ],
  RESPONSE: [
    { id: 'RS1', name: 'Improve emergency response capabilities' },
    { id: 'RS2', name: 'Enhance rehabilitation and reintegration' },
    { id: 'RS3', name: 'Strengthen inter-agency coordination' }
  ]
};

const outcomesByObjective: Record<string, Outcome[]> = {
  AW1: [
    { id: 'AW1-O1', name: 'Increased community awareness of VE indicators' },
    { id: 'AW1-O2', name: 'Enhanced reporting mechanisms utilized' }
  ],
  AW2: [
    { id: 'AW2-O1', name: 'Alternative narratives developed and disseminated' },
    { id: 'AW2-O2', name: 'Community voices amplified against extremism' }
  ],
  AW3: [
    { id: 'AW3-O1', name: 'Improved digital literacy among target groups' },
    { id: 'AW3-O2', name: 'Critical thinking skills enhanced' }
  ],
  PR1: [
    { id: 'PR1-O1', name: 'Strengthened community bonds and trust' },
    { id: 'PR1-O2', name: 'Reduced inter-community tensions' }
  ],
  PR2: [
    { id: 'PR2-O1', name: 'Economic opportunities increased' },
    { id: 'PR2-O2', name: 'Social grievances addressed' }
  ],
  PR3: [
    { id: 'PR3-O1', name: 'Youth leadership programs established' },
    { id: 'PR3-O2', name: 'Positive youth engagement increased' }
  ],
  PT1: [
    { id: 'PT1-O1', name: 'Security protocols implemented' },
    { id: 'PT1-O2', name: 'Early warning systems established' }
  ],
  PT2: [
    { id: 'PT2-O1', name: 'Vulnerable groups identified and protected' },
    { id: 'PT2-O2', name: 'Support services accessible' }
  ],
  PT3: [
    { id: 'PT3-O1', name: 'Institutional capacity enhanced' },
    { id: 'PT3-O2', name: 'Staff training programs completed' }
  ],
  RS1: [
    { id: 'RS1-O1', name: 'Response time improved' },
    { id: 'RS1-O2', name: 'Emergency protocols activated effectively' }
  ],
  RS2: [
    { id: 'RS2-O1', name: 'Rehabilitation programs operational' },
    { id: 'RS2-O2', name: 'Reintegration success rates increased' }
  ],
  RS3: [
    { id: 'RS3-O1', name: 'Coordination mechanisms established' },
    { id: 'RS3-O2', name: 'Information sharing improved' }
  ]
};

const predefinedOutputs: PredefinedOutput[] = [
  { id: 'OUT1', name: 'Community Awareness Campaigns', description: 'Educational campaigns targeting community awareness' },
  { id: 'OUT2', name: 'Training Workshops', description: 'Capacity building workshops for stakeholders' },
  { id: 'OUT3', name: 'Youth Engagement Programs', description: 'Programs specifically targeting youth participation' },
  { id: 'OUT4', name: 'Media and Communication Materials', description: 'Development of awareness materials' },
  { id: 'OUT5', name: 'Community Dialogues', description: 'Facilitated community discussion forums' },
  { id: 'OUT6', name: 'Security Enhancement Measures', description: 'Implementation of security protocols' },
  { id: 'OUT7', name: 'Economic Empowerment Initiatives', description: 'Programs to address economic grievances' },
  { id: 'OUT8', name: 'Rehabilitation Support Services', description: 'Services for rehabilitation and reintegration' }
];

const counties: string[] = [
  'Mombasa', 'Kwale', 'Kilifi', 'Tana River', 'Lamu', 'Taita-Taveta', 'Garissa', 'Wajir', 'Mandera', 'Marsabit'
];

const subcountiesByCounty: Record<string, string[]> = {
  Mombasa: ['Changamwe', 'Jomba', 'Kisauni', 'Nyali', 'Likoni', 'Mvita'],
  Kwale: ['Msambweni', 'Lungalunga', 'Matuga', 'Kinango', 'Samburu'],
  Kilifi: ['Kilifi North', 'Kilifi South', 'Kaloleni', 'Rabai', 'Ganze', 'Malindi', 'Magarini'],
  'Tana River': ['Garsen', 'Galole', 'Bura'],
  Lamu: ['Lamu East', 'Lamu West'],
  'Taita-Taveta': ['Taveta', 'Wundanyi', 'Mwatate', 'Voi'],
  Garissa: ['Garissa Township', 'Balambala', 'Lagdera', 'Dadaab', 'Fafi', 'Ijara'],
  Wajir: ['Wajir North', 'Wajir East', 'Tarbaj', 'Wajir West', 'Eldas', 'Wajir South'],
  Mandera: ['Mandera West', 'Banissa', 'Mandera North', 'Mandera South', 'Mandera East', 'Lafey'],
  Marsabit: ['Moyale', 'North Horr', 'Saku', 'Laisamis']
};

const PCVEActivityModal: React.FC<PCVEActivityModalProps> = ({
  setIsModalOpen,
  setIsEditModalOpen,
  setEditingActivity,
  // onSubmit,
  onCancel
}) => {
  // State management
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form data state
  const [formData, setFormData] = useState<FormData>({
    priorityArea: '',
    objective: '',
    outcome: '',
    outputs: [],
    activities: [],
    counties: [],
    subcounties: [],
    profileVisibility: 'PUBLIC'
  });

  const [newOutputName, setNewOutputName] = useState<string>('');
  const [newOutputDescription, setNewOutputDescription] = useState<string>('');

  // Available options based on selections
  const [availableObjectives, setAvailableObjectives] = useState<Objective[]>([]);
  const [availableOutcomes, setAvailableOutcomes] = useState<Outcome[]>([]);
  const [availableSubcounties, setAvailableSubcounties] = useState<string[]>([]);

  // Validation errors
  const [errors, setErrors] = useState<ValidationErrors>({});

  // Update available options when selections change
  useEffect(() => {
    if (formData.priorityArea) {
      setAvailableObjectives(objectivesByPriority[formData.priorityArea] || []);
      setFormData(prev => ({ ...prev, objective: '', outcome: '' }));
    }
  }, [formData.priorityArea]);

  useEffect(() => {
    if (formData.objective) {
      setAvailableOutcomes(outcomesByObjective[formData.objective] || []);
      setFormData(prev => ({ ...prev, outcome: '' }));
    }
  }, [formData.objective]);

  useEffect(() => {
    if (formData.counties.length > 0) {
      const allSubcounties = formData.counties.flatMap(county =>
        subcountiesByCounty[county] || []
      );
      setAvailableSubcounties(allSubcounties);
    } else {
      setAvailableSubcounties([]);
      setFormData(prev => ({ ...prev, subcounties: [] }));
    }
  }, [formData.counties]);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear related errors
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleArrayChange = (field: keyof FormData, value: string, action: 'add' | 'remove' | 'toggle' = 'toggle') => {
    setFormData(prev => {
      const currentArray = (prev[field] as string[]) || [];
      let newArray: string[];

      if (action === 'add') {
        newArray = [...currentArray, value];
      } else if (action === 'remove') {
        newArray = currentArray.filter(item => item !== value);
      } else { // toggle
        newArray = currentArray.includes(value)
          ? currentArray.filter(item => item !== value)
          : [...currentArray, value];
      }

      return { ...prev, [field]: newArray };
    });
  };

  // const addOutput = (outputId: string) => {
  //   const output = predefinedOutputs.find(o => o.id === outputId);
  //   if (output && !formData.outputs.find(o => o.id === outputId)) {
  //     setFormData(prev => ({
  //       ...prev,
  //       outputs: [...prev.outputs, { ...output, activities: [] }]
  //     }));
  //   }
  // };

  const addOutput = () => {
    if (newOutputName.trim()) {
      const newOutput: OutputWithActivities = {
        id: `custom_${Date.now()}`,
        name: newOutputName.trim(),
        description: newOutputDescription.trim(),
        activities: []
      };
      
      setFormData(prev => ({
        ...prev,
        outputs: [...prev.outputs, newOutput]
      }));
      
      setNewOutputName('');
      setNewOutputDescription('');
    }
  };

  const removeOutput = (outputId: string) => {
    setFormData(prev => ({
      ...prev,
      outputs: prev.outputs.filter(o => o.id !== outputId)
    }));
  };

  const addActivity = (outputId: string, activity: NewActivity) => {
    if (!activity.title.trim()) return;

    setFormData(prev => ({
      ...prev,
      outputs: prev.outputs.map(output =>
        output.id === outputId
          ? {
            ...output,
            activities: [...output.activities, {
              id: Date.now() + Math.random(),
              ...activity
            }]
          }
          : output
      )
    }));
  };

  const removeActivity = (outputId: string, activityId: number) => {
    setFormData(prev => ({
      ...prev,
      outputs: prev.outputs.map(output =>
        output.id === outputId
          ? {
            ...output,
            activities: output.activities.filter(a => a.id !== activityId)
          }
          : output
      )
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!formData.priorityArea) newErrors.priorityArea = 'Priority Area is required';
        if (!formData.objective) newErrors.objective = 'Objective is required';
        if (!formData.outcome) newErrors.outcome = 'Outcome is required';
        break;
      case 2:
        if (formData.outputs.length === 0) newErrors.outputs = 'At least one output is required';
        formData.outputs.forEach((output, index) => {
          if (output.activities.length === 0) {
            newErrors[`output_${index}_activities`] = `Activities required for ${output.name}`;
          }
        });
        break;
      case 3:
        if (formData.counties.length === 0) newErrors.counties = 'At least one county is required';
        if (formData.subcounties.length === 0) newErrors.subcounties = 'At least one subcounty is required';
        // if (!formData.csoId) newErrors.csoId = 'CSO ID is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      console.log('PCVE Action Data:', formData);
      toast.success('PCVE Action saved successfully!');

      // Reset form and close modal
      setFormData({
        priorityArea: '',
        objective: '',
        outcome: '',
        outputs: [],
        activities: [],
        counties: [],
        subcounties: [],
        // csoId: '',
        profileVisibility: 'PUBLIC'
      });
      setCurrentStep(1);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving PCVE Action:', error);
      toast.error('Error saving PCVE Action. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= currentStep
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-600'
            }`}>
            {step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 mx-2 ${step < currentStep ? 'bg-purple-600' : 'bg-gray-200'
              }`} />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Step 1: Select Priority Area, Objective & Outcome
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Building className="w-4 h-4 inline mr-2" />
          Priority Area *
        </label>
        <select
          value={formData.priorityArea}
          onChange={(e) => handleInputChange('priorityArea', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        >
          <option value="">Select Priority Area</option>
          {priorityAreas.map(area => (
            <option key={area.id} value={area.id}>{area.name}</option>
          ))}
        </select>
        {errors.priorityArea && (
          <p className="text-red-500 text-sm mt-1">{errors.priorityArea}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Objective *
        </label>
        <select
          value={formData.objective}
          onChange={(e) => handleInputChange('objective', e.target.value)}
          disabled={!formData.priorityArea}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none disabled:bg-gray-100"
        >
          <option value="">Select Objective</option>
          {availableObjectives.map(obj => (
            <option key={obj.id} value={obj.id}>{obj.name}</option>
          ))}
        </select>
        {errors.objective && (
          <p className="text-red-500 text-sm mt-1">{errors.objective}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Outcome *
        </label>
        <select
          value={formData.outcome}
          onChange={(e) => handleInputChange('outcome', e.target.value)}
          disabled={!formData.objective}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none disabled:bg-gray-100"
        >
          <option value="">Select Outcome</option>
          {availableOutcomes.map(outcome => (
            <option key={outcome.id} value={outcome.id}>{outcome.name}</option>
          ))}
        </select>
        {errors.outcome && (
          <p className="text-red-500 text-sm mt-1">{errors.outcome}</p>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Step 2: Add Outputs & Activities
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add New Output *
        </label>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Output name"
              value={newOutputName}
              onChange={(e) => setNewOutputName(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <textarea
              placeholder="Output description"
              value={newOutputDescription}
              onChange={(e) => setNewOutputDescription(e.target.value)}
              rows={2}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
            />
            <button
              type="button"
              onClick={addOutput}
              disabled={!newOutputName.trim()}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Output
            </button>
          </div>
        </div>
        {errors.outputs && (
          <p className="text-red-500 text-sm mt-1">{errors.outputs}</p>
        )}
      </div>
  
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Selected Outputs & Activities</h4>
        {formData.outputs.map((output, outputIndex) => (
          <OutputActivitySection
            key={output.id}
            output={output}
            outputIndex={outputIndex}
            onRemoveOutput={() => removeOutput(output.id)}
            onAddActivity={(activity) => addActivity(output.id, activity)}
            onRemoveActivity={(activityId) => removeActivity(output.id, activityId)}
            errors={errors}
          />
        ))}
      </div>
    </div>
  );
  
  // 6. Update renderStep3 - remove CSO ID section
  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Step 3: Select Counties & Subcounties
      </h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MapPin className="w-4 h-4 inline mr-2" />
          Counties *
        </label>
        <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
          {counties.map(county => (
            <label key={county} className="flex items-center py-1">
              <input
                type="checkbox"
                checked={formData.counties.includes(county)}
                onChange={() => handleArrayChange('counties', county)}
                className="mr-2"
              />
              <span className="text-sm">{county}</span>
            </label>
          ))}
        </div>
        {errors.counties && (
          <p className="text-red-500 text-sm mt-1">{errors.counties}</p>
        )}
      </div>
  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subcounties *
        </label>
        <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
          {availableSubcounties.map(subcounty => (
            <label key={subcounty} className="flex items-center py-1">
              <input
                type="checkbox"
                checked={formData.subcounties.includes(subcounty)}
                onChange={() => handleArrayChange('subcounties', subcounty)}
                className="mr-2"
              />
              <span className="text-sm">{subcounty}</span>
            </label>
          ))}
        </div>
        {errors.subcounties && (
          <p className="text-red-500 text-sm mt-1">{errors.subcounties}</p>
        )}
      </div>
    </div>
  );

  // const renderStep2 = () => (
  //   <div className="space-y-6">
  //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
  //       Step 2: Add Outputs & Activities
  //     </h3>

  //     <div>
  //       <label className="block text-sm font-medium text-gray-700 mb-2">
  //         Select Outputs *
  //       </label>
  //       <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
  //         {predefinedOutputs.map(output => (
  //           <div key={output.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
  //             <div>
  //               <p className="font-medium text-sm">{output.name}</p>
  //               <p className="text-xs text-gray-600">{output.description}</p>
  //             </div>
  //             <button
  //               type="button"
  //               onClick={() => addOutput(output.id)}
  //               disabled={!!formData.outputs.find(o => o.id === output.id)}
  //               className="px-3 py-1 text-xs bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
  //             >
  //               {formData.outputs.find(o => o.id === output.id) ? 'Added' : 'Add'}
  //             </button>
  //           </div>
  //         ))}
  //       </div>
  //       {errors.outputs && (
  //         <p className="text-red-500 text-sm mt-1">{errors.outputs}</p>
  //       )}
  //     </div>

  //     <div className="space-y-4">
  //       <h4 className="font-medium text-gray-900">Selected Outputs & Activities</h4>
  //       {formData.outputs.map((output, outputIndex) => (
  //         <OutputActivitySection
  //           key={output.id}
  //           output={output}
  //           outputIndex={outputIndex}
  //           onRemoveOutput={() => removeOutput(output.id)}
  //           onAddActivity={(activity) => addActivity(output.id, activity)}
  //           onRemoveActivity={(activityId) => removeActivity(output.id, activityId)}
  //           errors={errors}
  //         />
  //       ))}
  //     </div>
  //   </div>
  // );

  // const renderStep3 = () => (
  //   <div className="space-y-6">
  //     <h3 className="text-lg font-semibold text-gray-900 mb-4">
  //       Step 3: Select Counties, Subcounties & CSO Details
  //     </h3>

  //     <div>
  //       <label className="block text-sm font-medium text-gray-700 mb-2">
  //         <MapPin className="w-4 h-4 inline mr-2" />
  //         Counties *
  //       </label>
  //       <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
  //         {counties.map(county => (
  //           <label key={county} className="flex items-center py-1">
  //             <input
  //               type="checkbox"
  //               checked={formData.counties.includes(county)}
  //               onChange={() => handleArrayChange('counties', county)}
  //               className="mr-2"
  //             />
  //             <span className="text-sm">{county}</span>
  //           </label>
  //         ))}
  //       </div>
  //       {errors.counties && (
  //         <p className="text-red-500 text-sm mt-1">{errors.counties}</p>
  //       )}
  //     </div>

  //     <div>
  //       <label className="block text-sm font-medium text-gray-700 mb-2">
  //         Subcounties *
  //       </label>
  //       <div className="border border-gray-300 rounded-lg p-4 max-h-40 overflow-y-auto">
  //         {availableSubcounties.map(subcounty => (
  //           <label key={subcounty} className="flex items-center py-1">
  //             <input
  //               type="checkbox"
  //               checked={formData.subcounties.includes(subcounty)}
  //               onChange={() => handleArrayChange('subcounties', subcounty)}
  //               className="mr-2"
  //             />
  //             <span className="text-sm">{subcounty}</span>
  //           </label>
  //         ))}
  //       </div>
  //       {errors.subcounties && (
  //         <p className="text-red-500 text-sm mt-1">{errors.subcounties}</p>
  //       )}
  //     </div>

  //     <div>
  //       <label className="block text-sm font-medium text-gray-700 mb-2">
  //         <User className="w-4 h-4 inline mr-2" />
  //         CSO ID *
  //       </label>
  //       <input
  //         type="text"
  //         value={formData.csoId}
  //         onChange={(e) => handleInputChange('csoId', e.target.value)}
  //         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
  //         placeholder="Enter CSO ID (e.g., 123A)"
  //       />
  //       {errors.csoId && (
  //         <p className="text-red-500 text-sm mt-1">{errors.csoId}</p>
  //       )}
  //     </div>
  //   </div>
  // );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Step 4: Profile Visibility & Review
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Profile Visibility
        </label>
        <select
          value={formData.profileVisibility}
          onChange={(e) => handleInputChange('profileVisibility', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
        >
          <option value="PUBLIC">Public</option>
          <option value="PRIVATE">Private</option>
          <option value="RESTRICTED">Restricted</option>
        </select>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3">Review Your PCVE Action</h4>
        <div className="space-y-2 text-sm">
          <p><strong>Priority Area:</strong> {priorityAreas.find(p => p.id === formData.priorityArea)?.name}</p>
          <p><strong>Objective:</strong> {availableObjectives.find(o => o.id === formData.objective)?.name}</p>
          <p><strong>Outcome:</strong> {availableOutcomes.find(o => o.id === formData.outcome)?.name}</p>
          <p><strong>Outputs:</strong> {formData.outputs.length}</p>
          <p><strong>Total Activities:</strong> {formData.outputs.reduce((acc, output) => acc + output.activities.length, 0)}</p>
          <p><strong>Counties:</strong> {formData.counties.join(', ')}</p>
          <p><strong>Subcounties:</strong> {formData.subcounties.join(', ')}</p>
          {/* <p><strong>CSO ID:</strong> {formData.csoId}</p> */}
          <p><strong>Visibility:</strong> {formData.profileVisibility}</p>
        </div>
      </div>
    </div>
  );

  //   if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Add PCVE Action to Implement
          </h2>
          <button
            onClick={() => setIsModalOpen(false)}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {renderStepIndicator()}

        <div className="min-h-[400px]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
        </div>

        <div className="flex items-center justify-between pt-6 border-t">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>

            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isSubmitting && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span>{isSubmitting ? 'Saving...' : 'Save PCVE Action'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Output and Activity Management
const OutputActivitySection: React.FC<OutputActivitySectionProps> = ({
  output,
  outputIndex,
  onRemoveOutput,
  onAddActivity,
  onRemoveActivity,
  errors
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [newActivity, setNewActivity] = useState<NewActivity>({
    title: '',
    description: '',
    scheduledDate: '',
    location: ''
  });

  const handleAddActivity = () => {
    if (newActivity.title.trim()) {
      onAddActivity(newActivity);
      setNewActivity({ title: '', description: '', scheduledDate: '', location: '' });
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="mr-2"
          >
            {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>
          <h5 className="font-medium text-gray-900">{output.name}</h5>
        </div>
        <button
          type="button"
          onClick={onRemoveOutput}
          className="text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          <p className="text-sm text-gray-600">{output.description}</p>

          <div className="bg-gray-50 rounded-lg p-4">
            <h6 className="font-medium text-gray-900 mb-3">Add Activity</h6>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Activity title"
                value={newActivity.title}
                onChange={(e) => setNewActivity(prev => ({ ...prev, title: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <input
                type="text"
                placeholder="Location"
                value={newActivity.location}
                onChange={(e) => setNewActivity(prev => ({ ...prev, location: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <input
                type="datetime-local"
                value={newActivity.scheduledDate}
                onChange={(e) => setNewActivity(prev => ({ ...prev, scheduledDate: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={handleAddActivity}
                className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Activity
              </button>
            </div>
            <div className="mt-4">
              <textarea
                placeholder="Activity description"
                value={newActivity.description}
                onChange={(e) => setNewActivity(prev => ({ ...prev, description: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          {output.activities.length > 0 && (
            <div>
              <h6 className="font-medium text-gray-900 mb-2">Activities ({output.activities.length})</h6>
              <div className="space-y-2">
                {output.activities.map((activity, index) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h6 className="font-medium text-sm text-gray-900">{activity.title}</h6>
                        <button
                          type="button"
                          onClick={() => onRemoveActivity(activity.id)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {activity.description && (
                        <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        {activity.location && (
                          <span className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {activity.location}
                          </span>
                        )}
                        {activity.scheduledDate && (
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(activity.scheduledDate).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {errors[`output_${outputIndex}_activities`] && (
            <p className="text-red-500 text-sm">{errors[`output_${outputIndex}_activities`]}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PCVEActivityModal;
