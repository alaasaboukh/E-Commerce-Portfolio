import { Star } from "lucide-react";

const RatingStars = ({ rating, count }: { rating: number; count: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating - fullStars >= 0.5;
    const totalStars = 5;

    return (
        <div className="flex items-center gap-1 text-sm">
            {[...Array(fullStars)].map((_, i) => (
                <Star key={i} fill="orange" color="orange" size={16} />
            ))}

            {hasHalfStar && <Star fill="url(#half)" color="orange" size={16} />}

            {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map(
                (_, i) => (
                    <Star key={i} color="gray" size={16} />
                )
            )}

            <span className="text-gray-500 text-xs ml-1">({count})</span>
        </div>
    );
};

export default RatingStars;
