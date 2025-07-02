
import React from 'react';
import { Heart, ThumbsDown, Star, MapPin, Calendar, User, Building } from 'lucide-react';

interface Activity {
    id: number;
    title: string;
    description: string;
    scheduledDate: string;
    location: string;
    likes: number;
    dislikes: number;
    rating: number;
    totalRatings: number;
    isLiked: boolean;
    isDisliked: boolean;
    userRating: number;
    author: string;
    priorityArea: string;
    county: string;
    subcounty: string;
}

interface ActivityCardProps {
    activity: Activity;
    onLike: () => void;
    onDislike: () => void;
    onRate: (rating: number) => void;
}

const StarRating = ({ rating, userRating, onRate }: { rating: number; userRating: number; onRate: (rating: number) => void }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => onRate(star)}
                    className="focus:outline-none transition-colors duration-200"
                >
                    <Star
                        className={`w-4 h-4 ${star <= userRating
                                ? 'text-yellow-400 fill-yellow-400'
                                : star <= rating
                                    ? 'text-yellow-300 fill-yellow-300'
                                    : 'text-gray-300'
                            }`}
                    />
                </button>
            ))}
        </div>
    );
};

export const ActivityCard: React.FC<ActivityCardProps> = ({
    activity,
    onLike,
    onDislike,
    onRate
}) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getPriorityAreaColor = (area: string) => {
        switch (area.toLowerCase()) {
            case 'awareness':
                return 'bg-blue-100 text-blue-800';
            case 'prevention':
                return 'bg-green-100 text-green-800';
            case 'protection':
                return 'bg-yellow-100 text-yellow-800';
            case 'response':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
            {/* Header */}
            <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityAreaColor(activity.priorityArea)}`}>
                        {activity.priorityArea}
                    </span>
                    <div className="flex items-center space-x-1">
                        <StarRating
                            rating={activity.rating}
                            userRating={activity.userRating}
                            onRate={onRate}
                        />
                        <span className="text-sm text-gray-500 ml-2">
                            ({activity.totalRatings})
                        </span>
                    </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {activity.title}
                </h3>

                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {activity.description}
                </p>

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-2" />
                        {activity.author}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        {activity.location}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(activity.scheduledDate)}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <Building className="w-4 h-4 mr-2" />
                        {activity.county}, {activity.subcounty}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onLike}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${activity.isLiked
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <Heart
                                className={`w-4 h-4 ${activity.isLiked ? 'fill-blue-600 text-blue-600' : 'text-gray-400'
                                    }`}
                            />
                            <span>{activity.likes}</span>
                        </button>

                        <button
                            onClick={onDislike}
                            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${activity.isDisliked
                                    ? 'bg-red-100 text-red-700'
                                    : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <ThumbsDown
                                className={`w-4 h-4 ${activity.isDisliked ? 'fill-red-600 text-red-600' : 'text-gray-400'
                                    }`}
                            />
                            <span>{activity.dislikes}</span>
                        </button>
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{activity.rating.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
