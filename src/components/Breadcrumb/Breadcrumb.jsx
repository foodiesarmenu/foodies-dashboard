
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";

export function Component({ second, third }) {
    return (
        <Breadcrumb aria-label="Default breadcrumb example" className="dark">
            <Link to="/">
                <BreadcrumbItem icon={HiHome}>Home</BreadcrumbItem>
            </Link>

            <BreadcrumbItem >
                <Link to="/">{second} </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>{third}</BreadcrumbItem>
        </Breadcrumb>
    );
}
