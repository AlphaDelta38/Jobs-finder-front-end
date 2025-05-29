
import React  from "react";
import JobDetails from "@/components/JobDetails";

interface PageProps {
    params: {
        id: string;
    };
}

type Params = { id: string }

const Page = ({ params }: { params: Promise<Params> }) => {
    const { id } = React.use(params)

    return (<JobDetails id={id}/>);
};

export default Page;
