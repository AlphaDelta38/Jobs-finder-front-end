
import React  from "react";
import JobDetails from "@/components/JobDetails";

interface PageProps {
    params: {
        id: string;
    };
}

const page = ({ params }: PageProps) => {
    return (<JobDetails id={params.id}/>);
};

export default page;
