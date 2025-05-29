export type JobInterface = {
    id: string;
    title: string;
    company: string;
    location: string;
    postedAt: string;
    source: string;
};

export interface JSearchApiResponse {
    data: JobInterface[];
    status: string;
    request_id: string;
    [key: string]: any;
}

export interface JobDetailsProps {
    job_title: string;
    employer_name: string;
    employer_website: string;
    job_location: string;
    job_country: string;
    job_description: string;
    job_apply_link: string;
    job_google_link: string;
    job_posted_at_datetime_utc: string;
    job_employment_type: string;
    job_is_remote: boolean;
    job_highlights: {
        Qualifications?: string[];
        Responsibilities?: string[];
        Benefits?: string[];
    };
    job_benefits?: string[];
    job_salary?: string;
}

export interface LikedJobs{
    title: string,
    id: string
}
