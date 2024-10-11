import styled from "styled-components";

const WrapperLayout = styled.div`
    display: flex;
    flex-direction: row;

    button {
        border: none;
    }

    .navigation {
        background-color: var(--color-main);
        width: 400px;
        min-height: 100vh;
        transition: 0.5s;
        overflow: hidden;
        display: inline-block;

        p {
            color: #fff !important;
        }

        ul {

            list-style-type: none;
            max-width: 90%;
            padding-left: 10px !important;

            a {
                text-decoration: none;
            }

            img {
                width: 100%;
            }

            li {
                padding: 10px 10px 10px 6.5px;
                border-radius: 10px;
                white-space: nowrap;
                color: #fff;

                &:not(.active, .logo):hover {
                    background-color: var(--color-active);
                    opacity: 0.7;
                    cursor: pointer;
                }

                &.active {
                    background-color: var(--color-active);
                }

                &.logo:hover {
                    background-color: unset;
                    cursor: auto;
                }

                &.active .icon.alert svg {
                    color: white;
                }

                .icon {
                    display: inline-block;
                    min-width: 40px;
                    text-align: center;

                    &.alert {
                        margin-bottom: 0;
                        padding: 0;

                        svg {
                            color: orange;
                        }
                    }
                }

                svg {
                    font-size: 20px;
                    color: #fff;
                }

                p {
                    margin-left: 16px;
                    display: inline;
                    color: #fff;
                }

                &.hr:hover {
                    background-color: unset;
                    cursor: auto;
                }
            }

        }
    }

    &.active .navigation {
        width: 73px;
    }

    @media screen and (min-width: 1200px) {
        .main {
            max-width: calc(100% - 307.734px);
        }

        &.active .main {
            max-width: calc(100% - 73px);
        }
    }

    .main {
        width: 100%;
        display: inline-block;

        .page {
            margin-left: 15px;
            margin-right: 15px;
        }

        .toggle {
            font-size: 35px;

            &:hover {
                cursor: pointer;
            }
        }

        header {
            margin-left: 15px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding: 15px 15px 15px 0;
        }
    }

    #header-responsive {
        display: none;

        button.navbar-toggler.collapsed {
            margin-right: 15px;
        }
    }

    @media screen and (max-width: 1200px) {
        display: flex;
        flex-direction: column;

        .navigation,
        .main .toggle {
            display: none;
        }
        .main header {
            justify-content: flex-end;
            padding-bottom: 25px;
        }
        #header-responsive {
            display: flex;
        }
    }

    #header-responsive {
        text-transform: uppercase;
        background-color: var(--color-main);

        button {
            color: var(--color-font) !important;
        }

        .navbar-brand {
            margin-right: 50px;
        }

        nav {
            max-height: '100px';
        }

        .navbar {
            display: flex;
            justify-content: center;

            a,
            .btn-link {
                margin: 0 20px;
                text-decoration: none;
                color: white !important;
            }

            button {
                text-transform: uppercase;
                text-decoration: none;
            }
        }

        .navbar-toggler-icon {
            margin-right: 30px;
            background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
        }

        .navbar-toggler:focus,
        .navbar-toggler:active,
        .navbar-toggler-icon:focus {
            outline: none;
            box-shadow: none;
        }
    }

    .warning-message {
        border: 2px solid var(--color-primary);

        margin: 0 15px 2rem;

        background-color: #F0D9C1;

        svg {
            font-size: 2rem;
            color: orange;
            margin-right: 1rem;
        }

        .card-body {
            display: flex;
            align-items: center;
        }
    }
`;

export default WrapperLayout;