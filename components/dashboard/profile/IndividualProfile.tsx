// Individual PCVE Actor Profile Component
import React, { useState } from 'react';
import { Camera, Plus, Check, UserCheck} from 'lucide-react';
import { registeredUsers } from './Profile';
import Image from 'next/image';
import { User } from '@/types';

const IndividualProfile = ({ user, onUpdate }: { user: User; onUpdate: (data: any) => void }) => {
    const [formData, setFormData] = useState({
        bio: '',
        idPassportNumber: '',
        friends: [] as string[],
        profilePhoto: null as File | null
    });

    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    const handleAddFriend = (friendId: string) => {
        if (!selectedFriends.includes(friendId)) {
            setSelectedFriends([...selectedFriends, friendId]);
        }
    };

    const handleRemoveFriend = (friendId: string) => {
        setSelectedFriends(selectedFriends.filter(id => id !== friendId));
    };

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <UserCheck className="mr-2 text-blue-600" />
                    Individual PCVE Actor Profile
                </h3>

                {/* Profile Photo */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recent Passport Photo
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
                            id="profile-photo"
                        />
                        <label
                            htmlFor="profile-photo"
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
                        >
                            Upload Photo
                        </label>
                    </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        About Me (Bio)
                    </label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={4}
                        placeholder="Tell us about yourself and your involvement in PCVE..."
                    />
                </div>

                {/* ID/Passport Number */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        ID/Passport Number
                    </label>
                    <input
                        type="text"
                        value={formData.idPassportNumber}
                        onChange={(e) => setFormData({ ...formData, idPassportNumber: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your ID or Passport number"
                    />
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
                                            ? handleRemoveFriend(friend.id)
                                            : handleAddFriend(friend.id)
                                    }
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedFriends.includes(friend.id)
                                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
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

export default IndividualProfile;