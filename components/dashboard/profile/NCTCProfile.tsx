// NCTC Staff Profile Component
import React, { useState } from 'react';
import { Camera, Plus, Check, Shield} from 'lucide-react';
import { registeredUsers } from './Profile';
import Image from 'next/image';
import { User } from '@/types';

const nctcDepartments = {
    'ICT/Stratcom': ['ICT', 'Media'],
    'AD': ['Disengagement', 'Analysis'],
    'Admin': ['Finance', 'Transport', 'Security'],
    'P&R': ['P&R'],
    'P&D': ['P&D'],
    'CT': ['CT'],
    'TRD': ['TRD'],
    'PPL': ['Protocol', 'Liaison', 'Partnerships'],
    'Projects': ['Projects']
};

const NCTCProfile = ({ user, onUpdate }: { user: User; onUpdate: (data: any) => void }) => {
    const [formData, setFormData] = useState({
        bio: '',
        branch: '',
        department: '',
        idPassportNumber: '',
        friends: [] as string[],
        profilePhoto: null as File | null
    });

    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);
    const availableDepartments = formData.branch ? nctcDepartments[formData.branch as keyof typeof nctcDepartments] : [];

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Shield className="mr-2 text-red-600" />
                    NCTC Staff Profile
                </h3>

                {/* Bio */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bio
                    </label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tell us about your role and experience at NCTC..."
                    />
                </div>

                {/* Branch and Department */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Branch
                        </label>
                        <select
                            value={formData.branch}
                            onChange={(e) => setFormData({ ...formData, branch: e.target.value, department: '' })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        >
                            <option value="">Select Branch</option>
                            {Object.keys(nctcDepartments).map((branch) => (
                                <option key={branch} value={branch}>
                                    {branch}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Department
                        </label>
                        <select
                            value={formData.department}
                            onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                            disabled={!formData.branch}
                        >
                            <option value="">Select Department</option>
                            {availableDepartments.map((dept) => (
                                <option key={dept} value={dept}>
                                    {dept}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* ID/Passport Number (Optional) */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID/Passport Number (Optional)
                    </label>
                    <input
                        type="text"
                        value={formData.idPassportNumber}
                        onChange={(e) => setFormData({ ...formData, idPassportNumber: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Enter your ID or Passport number"
                    />
                </div>

                {/* Profile Photo (Optional) */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Passport Photo (Optional)
                    </label>
                    <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            {formData.profilePhoto ? (
                                <Image
                                    src={URL.createObjectURL(formData.profilePhoto)}
                                    alt="Profile"
                                    className="w-full h-full object-cover rounded-lg"
                                    width={100}
                                    height={100}
                                />
                            ) : (
                                <Camera className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.files?.[0] || null })}
                            className="hidden"
                            id="nctc-photo"
                        />
                        <label
                            htmlFor="nctc-photo"
                            className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer hover:bg-red-700 transition-colors"
                        >
                            Upload Photo
                        </label>
                    </div>
                </div>

                {/* Add Friends */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Friends (from registered users)
                    </label>
                    <div className="space-y-3">
                        {registeredUsers.map((friend) => (
                            <div key={friend.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                <div>
                                    <p className="font-medium">{friend.name}</p>
                                    <p className="text-sm text-gray-500">{friend.email}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        selectedFriends.includes(friend.id)
                                            ? setSelectedFriends(selectedFriends.filter(id => id !== friend.id))
                                            : setSelectedFriends([...selectedFriends, friend.id])
                                    }
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedFriends.includes(friend.id)
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                                        }`}
                                >
                                    {selectedFriends.includes(friend.id) ? (
                                        <>
                                            <Check className="w-4 h-4 inline mr-1" />
                                            Added
                                        </>
                                    ) : (
                                        <>
                                            <Plus className="w-4 h-4 inline mr-1" />
                                            Add
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NCTCProfile;