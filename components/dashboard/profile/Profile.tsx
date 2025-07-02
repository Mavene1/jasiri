"use client"

import React, { useState } from 'react';
import { User, X, Check, Star, Building, Users, Shield, UserCheck, ChevronDown } from 'lucide-react';
import IndividualProfile from './IndividualProfile';
import CEFProfile from './CEFProfile';
import NCTCProfile from './NCTCProfile';
import OrganizationProfile from './OrganiationProfile';

// Types
export type UserRole = 'individual' | 'cef' | 'organization' | 'nctc';

export interface BaseUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    profileComplete: number;
}

export interface ContactPerson {
    id: string;
    name: string;
    position: string;
    mobile: string;
}

export interface Address {
    id: string;
    street: string;
    city: string;
    county: string;
    postalCode: string;
}

// Mock data
export const counties = [
    'Nairobi', 'Mombasa', 'Nakuru', 'Eldoret', 'Kisumu', 'Thika', 'Malindi', 'Kitale'
];

export const registeredUsers = [
    { id: '1', name: 'Jane Doe', email: 'jane@example.com' },
    { id: '2', name: 'John Smith', email: 'john@example.com' },
    { id: '3', name: 'Mary Johnson', email: 'mary@example.com' },
    { id: '4', name: 'David Wilson', email: 'david@example.com' }
];

// Main Profile Component
const Profile = () => {
    const [user, setUser] = useState<BaseUser>({
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'nctc', // This would come from your auth system
        profileComplete: 25
    });

    const [showBadge, setShowBadge] = useState(true);

    const roleOptions = [
        { value: 'individual', label: 'Individual PCVE Actor' },
        { value: 'cef', label: 'CEF Secretariat' },
        { value: 'organization', label: 'Organization Member' },
        { value: 'nctc', label: 'NCTC Staff' }
    ];

    const handleRoleChange = (newRole: UserRole) => {
        setUser({ ...user, role: newRole });
        // Reset profile completion when role changes for demo purposes
        setUser(prev => ({ ...prev, role: newRole, profileComplete: 25 }));
        setShowBadge(true); // Show badge again when role changes
    };

    const handleProfileUpdate = (data: any) => {
        // Calculate completion percentage based on filled fields
        let completionPercentage = 25; // Base percentage

        // Add logic to calculate percentage based on role and filled fields
        if (user.role === 'individual') {
            if (data.bio) completionPercentage += 25;
            if (data.idPassportNumber) completionPercentage += 25;
            if (data.profilePhoto) completionPercentage += 25;
        }
        // Add similar logic for other roles

        setUser({ ...user, profileComplete: Math.min(completionPercentage, 100) });

        // Here you would save the data to your backend
        console.log('Profile updated:', data);
    };

    const getRoleDisplayName = (role: UserRole) => {
        const roleOption = roleOptions.find(option => option.value === role);
        return roleOption ? roleOption.label : 'User';
    };

    // const getRoleDisplayName2 = (role: UserRole) => {
    //     switch (role) {
    //         case 'individual':
    //             return 'Individual PCVE Actor';
    //         case 'cef':
    //             return 'CEF Secretariat';
    //         case 'organization':
    //             return 'Organization Member';
    //         case 'nctc':
    //             return 'NCTC Staff';
    //         default:
    //             return 'User';
    //     }
    // };

    const getRoleIcon = (role: UserRole) => {
        switch (role) {
            case 'individual':
                return <UserCheck className="w-6 h-6" />;
            case 'cef':
                return <Building className="w-6 h-6" />;
            case 'organization':
                return <Users className="w-6 h-6" />;
            case 'nctc':
                return <Shield className="w-6 h-6" />;
            default:
                return <User className="w-6 h-6" />;
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage < 50) return 'bg-red-500';
        if (percentage < 80) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    const renderRoleSpecificProfile = () => {
        switch (user.role) {
            case 'individual':
                return <IndividualProfile user={user} onUpdate={handleProfileUpdate} />;
            case 'cef':
                return <CEFProfile user={user} onUpdate={handleProfileUpdate} />;
            case 'organization':
                return <OrganizationProfile user={user} onUpdate={handleProfileUpdate} />;
            case 'nctc':
                return <NCTCProfile user={user} onUpdate={handleProfileUpdate} />;
            default:
                return <div>Unknown role</div>;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="flex items-center space-x-6 mb-6 md:mb-0">
                            <div className="relative">
                                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 shadow-lg">
                                    {getRoleIcon(user.role)}
                                </div>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-sm font-medium text-blue-600">{getRoleDisplayName(user.role)}</p>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(e.target.value as UserRole)}
                                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                {roleOptions.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {/* Profile Completion */}
                        <div className="text-center">
                            <div className="relative w-24 h-24 mb-3 ml-18">
                                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                                    <path
                                        className="text-gray-200"
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        fill="transparent"
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                    <path
                                        className={getProgressColor(user.profileComplete)}
                                        stroke="currentColor"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        fill="transparent"
                                        strokeDasharray={`${user.profileComplete}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold text-gray-700">{user.profileComplete}%</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600">Profile Complete</p>

                            {/* Update Profile Badge */}
                            {showBadge && user.profileComplete < 100 && (
                                <div className="mt-3 relative">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 shadow-lg animate-pulse">
                                        <Star className="w-4 h-4" />
                                        <span>Complete your profile!</span>
                                        <button
                                            onClick={() => setShowBadge(false)}
                                            className="ml-2 hover:bg-white hover:bg-opacity-20 rounded-full p-1"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Role-specific Profile Form */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="p-8">
                        {renderRoleSpecificProfile()}

                        {/* Save Button */}
                        <div className="mt-8 flex justify-end space-x-4">
                            <button className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button
                                onClick={() => handleProfileUpdate({})}
                                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tips Section */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">💡 Profile Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Complete your profile to unlock all features</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Add a professional photo to build trust</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Connect with other users in your network</span>
                        </div>
                        <div className="flex items-start space-x-2">
                            <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>Keep your information up to date</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;