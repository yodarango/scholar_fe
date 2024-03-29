export type TComment = {
   ID: string;
   POST_ID: string;
   body: string;
   creator_avatar: string;
   creator_signature: string;
   creator_approval_rate: string;
   creator_authority_level: number;
   creator_id: string;
   posted_on?: string;
   created_date?: string;
};

export type TRating = {
   average_count: number;
   total_count: number;
};
