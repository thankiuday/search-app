import React from 'react';

const Navbar = () => {
    return (
        <>
            <div className="container">
                <nav className="navbar navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <h5 className="text-primary fw-bold h4 ">Search-App</h5>
                        </a>
                        <button
                            className="navbar-toggler ms-auto border-light rounded-3"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarToggleExternalContent"
                            aria-controls="navbarToggleExternalContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon "></span>
                        </button>
                    </div>
                </nav>
                <div className="collapse" id="navbarToggleExternalContent">
                    <div className="p-4 text-end">
                        <a
                            href="#footer"
                            className="text-primary fs-2 fw-bold"
                        >
                            About Me!
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
