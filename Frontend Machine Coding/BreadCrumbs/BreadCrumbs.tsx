import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const BreadCrumbs = () => {
    const { pathname } = useLocation();
    const pathNames = pathname.split('/').filter((each) => each);

    let breadCrumbsPath = ``;

    return (
        <div className="flex flex-wrap gap-1 items-center w-full sm:w-[400px]">
            <Link to="/" style={{ color: 'burlywood' }}>
                <Home size={16} />
            </Link>
            <ChevronRight size={18} color="white" />
            {pathNames.map((each, index) => {
                breadCrumbsPath += `/${each}`;
                const isLast = index === pathNames.length - 1;

                return !isLast ? (
                    <React.Fragment key={breadCrumbsPath}>
                        <Link
                            to={breadCrumbsPath}
                            className="duration-200 hover:underline underline-offset-4"
                            style={{ color: 'burlywood' }}
                        >
                            {each}
                        </Link>
                        <ChevronRight size={18} color="white" />
                    </React.Fragment>
                ) : (
                    <span key={breadCrumbsPath}>{each}</span>
                );
            })}
        </div>
    );
};

export default BreadCrumbs;
