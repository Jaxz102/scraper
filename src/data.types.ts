export interface InstagramAccount {
    data:{
        user:{
            profile_pic_url: string,
            username: string,
            biography: string,
            full_name: string,
            is_verified: boolean,
            category: string,
            follower_count: number,
            following_count: number,
            media_count: number,
            is_private: boolean,
            external_url: string
        }
    }
  
}
