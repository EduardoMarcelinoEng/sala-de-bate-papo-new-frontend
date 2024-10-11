import styled from "styled-components"

const WrapperLogin = styled.div`
    background-color: var(--color-main);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    height: 100vh;

    form {
        max-width: 400px;
        width: 100%;

        img {
            width: 100%;
            margin-bottom: 1.5rem;
        }

        button {
            background-color: var(--color-primary);
            width: 100%;
            text-transform: uppercase;
            border: 0;
            --bs-btn-disabled-bg: #AB7620;
            
            &:hover,
            &:active {
                background-color: var(--color-primary) !important;
                opacity: 0.85;
            }

            margin-top: 1rem;
        }

        .link-create-account {
            display: flex;
            justify-content: flex-end;

            a {
                font-size: 0.8rem;
                color: white;
            }
        }

        label {
            color: white;
        }
    }
`;

export default WrapperLogin;