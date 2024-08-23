import { useState } from 'react';
import { Star } from 'lucide-react';

interface IProps {
    totalStars?: number;
}

const StarRating = ({ totalStars = 5 }: IProps) => {
    const [userRating, setUserRating] = useState(0);

    const updateUserRating = (rating: number) => {
        if (rating + 1 === userRating) {
            setUserRating(0);
        } else {
            setUserRating(rating + 1);
        }
    };

    const messagesAgainstRating: Record<number, string> = {
        0: `Please provide us a rating`,
        1: `Worst`,
        2: `Bad`,
        3: `Good`,
        4: `Better`,
        5: `Best`,
    };

    const fetchRatingMessage = (rating: number): string => {
        return messagesAgainstRating[rating] ?? 'Error';
    };

    return (
        <div className="flex flex-col gap-4">
            <div className={`flex justify-center gap-4`}>
                {[...Array(totalStars)].map((_, index) => {
                    return index < userRating ? (
                        <Star
                            key={index}
                            fill="green"
                            className="cursor-pointer text-green-700"
                            size={42}
                            onClick={() => {
                                updateUserRating(index);
                            }}
                        />
                    ) : (
                        <Star
                            key={index}
                            className="cursor-pointer"
                            size={42}
                            onClick={() => {
                                updateUserRating(index);
                            }}
                        />
                    );
                })}
            </div>
            <p className="text-center text-lg">
                {`${fetchRatingMessage(userRating)} ${
                    userRating === 0 ? '' : userRating
                }`}
            </p>
        </div>
    );
};

export default StarRating;
