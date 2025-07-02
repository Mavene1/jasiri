// Organization Profile Component
import React, { useState } from 'react';
import { Building, Users } from 'lucide-react';
import { Address, BaseUser, ContactPerson } from './Profile';
import Image from 'next/image';

const organizations = [
    'Kenya Red Cross', 'Amnesty International Kenya', 'Kenya Human Rights Commission',
    'Haki Africa', 'Muslims for Human Rights', 'Centre for Rights Education and Awareness'
];

const OrganizationProfile = ({ user, onUpdate }: { user: BaseUser; onUpdate: (data: any) => void }) => {
    const [joinType, setJoinType] = useState<'join' | 'add'>('join');
    const [selectedOrg, setSelectedOrg] = useState('');
    const [orgData, setOrgData] = useState({
        name: '',
        registrationNumber: '',
        addresses: [] as Address[],
        email: '',
        phone: '',
        website: '',
        socialMedia: [] as string[],
        contactPersons: [] as ContactPerson[],
        members: [] as string[],
        logo: null as File | null
    });

    const [newAddress, setNewAddress] = useState({ street: '', city: '', county: '', postalCode: '' });
    const [newSocialMedia, setNewSocialMedia] = useState('');
    const [newContact, setNewContact] = useState({ name: '', position: '', mobile: '' });

    const addAddress = () => {
        if (newAddress.street && newAddress.city && newAddress.county) {
            const address: Address = {
                id: Date.now().toString(),
                ...newAddress
            };
            setOrgData({ ...orgData, addresses: [...orgData.addresses, address] });
            setNewAddress({ street: '', city: '', county: '', postalCode: '' });
        }
    };

    const addSocialMedia = () => {
        if (newSocialMedia && !orgData.socialMedia.includes(newSocialMedia)) {
            setOrgData({ ...orgData, socialMedia: [...orgData.socialMedia, newSocialMedia] });
            setNewSocialMedia('');
        }
    };

    const addContactPerson = () => {
        if (newContact.name && newContact.position && newContact.mobile) {
            const contact: ContactPerson = {
                id: Date.now().toString(),
                ...newContact
            };
            setOrgData({ ...orgData, contactPersons: [...orgData.contactPersons, contact] });
            setNewContact({ name: '', position: '', mobile: '' });
        }
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Users className="mr-2 text-purple-600" />
                    Organization Profile
                </h3>

                {/* Join Type Selection */}
                <div className="mb-6">
                    <div className="flex space-x-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="join"
                                checked={joinType === 'join'}
                                onChange={(e) => setJoinType(e.target.value as 'join')}
                                className="mr-2"
                            />
                            Join existing organization
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                value="add"
                                checked={joinType === 'add'}
                                onChange={(e) => setJoinType(e.target.value as 'add')}
                                className="mr-2"
                            />
                            Add organization for accreditation
                        </label>
                    </div>
                </div>

                {joinType === 'join' ? (
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Organization
                        </label>
                        <select
                            value={selectedOrg}
                            onChange={(e) => setSelectedOrg(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            <option value="">Select an organization</option>
                            {organizations.map((org) => (
                                <option key={org} value={org}>
                                    {org}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-2">
                            Note: Admin will review and admit you to the organization
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Organization Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Organization Name
                                </label>
                                <input
                                    type="text"
                                    value={orgData.name}
                                    onChange={(e) => setOrgData({ ...orgData, name: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Registration Number
                                </label>
                                <input
                                    type="text"
                                    value={orgData.registrationNumber}
                                    onChange={(e) => setOrgData({ ...orgData, registrationNumber: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={orgData.email}
                                    onChange={(e) => setOrgData({ ...orgData, email: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={orgData.phone}
                                    onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    value={orgData.website}
                                    onChange={(e) => setOrgData({ ...orgData, website: e.target.value })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Organization Logo
                            </label>
                            <div className="flex items-center space-x-4">
                                <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    {orgData.logo ? (
                                        <Image
                                            src={URL.createObjectURL(orgData.logo)}
                                            alt="Logo"
                                            className="w-full h-full object-contain rounded-lg"
                                            width={100}
                                            height={100}
                                        />
                                    ) : (
                                        <Building className="w-8 h-8 text-gray-400" />
                                    )}
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setOrgData({ ...orgData, logo: e.target.files?.[0] || null })}
                                    className="hidden"
                                    id="org-logo"
                                />
                                <label
                                    htmlFor="org-logo"
                                    className="px-4 py-2 bg-purple-600 text-white rounded-lg cursor-pointer hover:bg-purple-700 transition-colors"
                                >
                                    Upload Logo
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrganizationProfile;