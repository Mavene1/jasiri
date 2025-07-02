// CEF Secretariat Profile Component
import React, { useState } from 'react';
import { Plus, X, Check, Building } from 'lucide-react';
import { BaseUser, ContactPerson, registeredUsers } from './Profile';

const cefSecretariats = [
    'Nairobi CEF Secretariat', 'Mombasa CEF Secretariat', 'Nakuru CEF Secretariat',
    'Eldoret CEF Secretariat', 'Kisumu CEF Secretariat'
];

const CEFProfile = ({ user, onUpdate }: { user: BaseUser; onUpdate: (data: any) => void }) => {
    const [formData, setFormData] = useState({
        selectedSecretariat: '',
        contactPersons: [] as ContactPerson[],
        members: [] as string[],
        logo: null as File | null
    });

    console.log(user);
    console.log(onUpdate);

    const [newContact, setNewContact] = useState({ name: '', position: '', mobile: '' });
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

    const addContactPerson = () => {
        if (newContact.name && newContact.position && newContact.mobile) {
            const contact: ContactPerson = {
                id: Date.now().toString(),
                ...newContact
            };
            setFormData({ ...formData, contactPersons: [...formData.contactPersons, contact] });
            setNewContact({ name: '', position: '', mobile: '' });
        }
    };

    const removeContactPerson = (id: string) => {
        setFormData({
            ...formData,
            contactPersons: formData.contactPersons.filter(cp => cp.id !== id)
        });
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Building className="mr-2 text-green-600" />
                    CEF Secretariat Profile
                </h3>

                {/* Select CEF Secretariat */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Join your CEF Secretariat
                    </label>
                    <select
                        value={formData.selectedSecretariat}
                        onChange={(e) => setFormData({ ...formData, selectedSecretariat: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="">Select CEF Secretariat</option>
                        {cefSecretariats.map((secretariat) => (
                            <option key={secretariat} value={secretariat}>
                                {secretariat}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Contact Persons */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Persons
                    </label>
                    <div className="space-y-3 mb-4">
                        {formData.contactPersons.map((contact) => (
                            <div key={contact.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                <div>
                                    <p className="font-medium">{contact.name}</p>
                                    <p className="text-sm text-gray-500">{contact.position} • {contact.mobile}</p>
                                </div>
                                <button
                                    onClick={() => removeContactPerson(contact.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                        <input
                            type="text"
                            placeholder="Name"
                            value={newContact.name}
                            onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <input
                            type="text"
                            placeholder="Position"
                            value={newContact.position}
                            onChange={(e) => setNewContact({ ...newContact, position: e.target.value })}
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            value={newContact.mobile}
                            onChange={(e) => setNewContact({ ...newContact, mobile: e.target.value })}
                            className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={addContactPerson}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-4 h-4 inline mr-1" />
                        Add Contact Person
                    </button>
                </div>

                {/* County Logo */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        County Logo
                    </label>
                    <div className="flex items-center space-x-4">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                            {formData.logo ? (
                                <img
                                    src={URL.createObjectURL(formData.logo)}
                                    alt="Logo"
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            ) : (
                                <Building className="w-8 h-8 text-gray-400" />
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
                            className="hidden"
                            id="county-logo"
                        />
                        <label
                            htmlFor="county-logo"
                            className="px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer hover:bg-green-700 transition-colors"
                        >
                            Upload Logo
                        </label>
                    </div>
                </div>

                {/* Add Members */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Add Secretariat Members
                    </label>
                    <div className="space-y-3">
                        {registeredUsers.map((member) => (
                            <div key={member.id} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                <div>
                                    <p className="font-medium">{member.name}</p>
                                    <p className="text-sm text-gray-500">{member.email}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        selectedMembers.includes(member.id)
                                            ? setSelectedMembers(selectedMembers.filter(id => id !== member.id))
                                            : setSelectedMembers([...selectedMembers, member.id])
                                    }
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedMembers.includes(member.id)
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                                        }`}
                                >
                                    {selectedMembers.includes(member.id) ? (
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

export default CEFProfile;
